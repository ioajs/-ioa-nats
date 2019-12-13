'use strict';

module.exports = async function (ctx, next) {

   console.log('token middleware');

   await next();
   
}