'use strict';

const { nats } = require('@app');

class User {
   async find(ctx) {

      const { body } = ctx.request;

      ctx.body = {
         code: 0,
         data: 888,
         test: ctx.test,
         token: ctx.token
      };

   }
   async findPk(ctx) {

      const { params } = ctx;

      ctx.body = {
         method: "findPk",
         params
      };

   }
   async create(ctx) {

      const { body } = ctx.request;

      ctx.body = body;

   }
   async update(ctx) {

      const { params } = ctx;

      const { body } = ctx.request;

      ctx.body = {
         params,
         body
      };

   }
   async delete(ctx) {

      const { body } = ctx.request;

      ctx.body = { t: 888 };

   }
}

module.exports = User;