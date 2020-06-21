'use strict';

const app = require('@app');

const { mrouter, nats } = app;

mrouter.get('/user/test', 'token', 'user.find');

mrouter.put('user', 'token', 'user.update');

/**
 * 发送测试请求
 */
setTimeout(async () => {

   const data = await nats.get("/user/test");

   console.log(data);
   
}, 500);
