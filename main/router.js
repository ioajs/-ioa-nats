'use strict';

const app = require('@app');

const { routeron, rpc } = app;

routeron.get('user', 'token', 'user.find');

routeron.put('user', 'token', 'user.update');

/**
 * 发送测试请求
 */
setTimeout(async () => {
   const data = await rpc.get("user");
   console.log(data);
}, 1000);
