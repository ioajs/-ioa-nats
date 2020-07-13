'use strict';

const { nats } = require('@app');

module.exports = class {
   async find(ctx) {

      console.log()

      ctx.body = {
         code: 100,
         token: ctx.token
      };

   }
};