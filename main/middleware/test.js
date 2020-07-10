'use strict';

module.exports = async function (ctx, next) {

   console.log('test middleware');

   await next();
   
}