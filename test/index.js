"use strict";

const Nats = require('nats');

const nats = Nats.connect({
   "url": "nats://8.129.183.107:4222",
   "token": "zhijian2019", 
   "json": true,
});

async function main() {

   const data = {
      where: `floor.scope(80,100);price.scope(101,200);bid.eq(2)`,
      order: "release.desc",
      limit: 10,
   };

   const result = await new Promise(function (resolve) {

      nats.request('GET:/user/test', data, { timeout: 2000 }, resolve);
      
   }).then(function (result) {

      if (result instanceof Error) {
         return {
            code: 1000,
            error: "响应超时"
         }
      } else {
         return result;
      }
      
   });

   console.log(result);

}

main();