import Nats from 'nats';
import Router from 'ioa-router/lib/Router.js';

export default {
   router: new Router(),
   jsonCodec: Nats.JSONCodec(),
   subjects: [], // 订阅项目队列
}