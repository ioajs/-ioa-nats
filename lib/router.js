"use strict";

const { $release } = require('@app');
const helper = require('ioa-router/lib/helper.js');
const routerTree = require('ioa-router/lib/routerTree.js');
const { routerPath, method } = require('./common.js');


/**
 * 遍历父级app，添加routeron路由
 */
for (const name in $release) {

   const app = $release[name];

   function base(path, middlewares) {

      routerPath.push(path);
   
      const controller = helper.getController(app, path, middlewares);
   
      routerTree.add(app, method, path, middlewares, controller);
   
   }

   app.nrouter = {
      get(path, ...middlewares) {

         base("GET:" + path, middlewares);

      },
      post(path, ...middlewares) {

         base("POST:" + path, middlewares);

      },
      put(path, ...middlewares) {

         base("PUT:" + path, middlewares);

      },
      delete(path, ...middlewares) {

         base("DELETE:" + path, middlewares);

      }
   };

   app.mrouter = app.nrouter;

}
