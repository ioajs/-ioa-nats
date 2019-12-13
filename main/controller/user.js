'use strict';

const { rpc } = require('@app');

class User {
   async find(ctx) {

      const { body } = ctx.request;

      console.log(body);

      const update = await rpc.put("user", { m: 6 });

      console.log(update);

      ctx.body = {
         code: 0,
         result: 888
      }

   }
   async update(ctx) {

      const { body } = ctx.request;

      console.log(body);

      ctx.body = { t: 888 }

   }
}

module.exports = User;