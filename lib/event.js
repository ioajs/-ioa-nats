"use strict";

const { nats } = require('@app');
const context = require('ioa-router/lib/context.js');
const routerTree = require('./routerTree.js');
const common = require('./common.js');

// 需要在路由装载后，subscribePaths才可用
const { subscribePaths } = common;

const middleware = context(routerTree);

// 批量订阅消息
for (const name of subscribePaths) {

  nats.subscribe(name, async (body, reply, subject) => {

    const [method, path] = subject.split('@');

    const ctx = {
      method,
      path: path.split('.').join('/'),
      request: { body },
    }

    await middleware(ctx);

    if (reply) {
      nats.publish(reply, ctx.body); // 不管ctx.body是否有值，始终回应
    }

  });

}