"use strict";

const { nats } = require('@app');
const consoln = require('consoln');
const routerMiddleware = require('ioa-router');
const common = require('./common.js');

// 需要在路由装载后，routerPath才可用
const { routerPath, method } = common;

nats.on('connect', function () {

   consoln.success(`nats connection success`);

   nats.on('disconnect', (error) => {
      consoln.error(`nats disconnect`);
   });

   nats.on('error', function (error) {
      consoln.error(error);
   });

   // 批量订阅消息
   for (const onPath of routerPath) {

      nats.subscribe(onPath, async (body, reply) => {

         const ctx = {
            path: onPath,
            method,
            request: { body },
         }

         await routerMiddleware(ctx);

         if (reply) {
            nats.publish(reply, ctx.body || {}); // 不管ctx.body是否有值，始终回应
         }

      });

   }

});