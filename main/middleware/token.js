'use strict';

module.exports = async function (ctx, next) {

   ctx.token = "token middleware";

   await next();
   
}