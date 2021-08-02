import ioa from 'ioa';
import context from 'ioa-router/lib/context.js';
import common from './common.js';

const { nats } = ioa.app();

// 需要在路由装载后，subjects才可用
const { router, subjects, jsonCodec } = common;

const middleware = context(router);

// 批量订阅消息
for (const name of subjects) {

  nats.subscribe(name, {
    async callback(err, msg) {

      const [method, path] = msg.subject.split('@');

      const ctx = {
        method,
        path: path.split('.').join('/'),
        request: { body: jsonCodec.decode(msg.data) },
      }

      await middleware(ctx);

      nats.publish(msg.reply, jsonCodec.encode(ctx.body));

    }
  });

}