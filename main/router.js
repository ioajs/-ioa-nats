'use strict';

const app = require('@app');

const { nrouter, nats } = app;

nrouter.get('/user/test', 'token', 'test', 'user.find');

nrouter.put('user', 'token', 'user.update');

/**
 * 发送测试请求
 */
setTimeout(async () => {

   const data = await nats.get("/user/test");

   console.log(data);

   nats.post("/user/test");

   nats.put("/user/test");

   await nats.delete("/user/test", { timeout: 3000 });

   console.log('end')

}, 500);
