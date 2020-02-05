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

   app.routeron = {
      get(path, ...middlewares) {

         this._base("/GET/" + path, middlewares);

      },
      post(path, ...middlewares) {

         this._base("/POST/" + path, middlewares);

      },
      put(path, ...middlewares) {

         this._base("/PUT/" + path, middlewares);

      },
      delete(path, ...middlewares) {

         this._base("/DELETE/" + path, middlewares);

      },
      _base(path, middlewares) {

         routerPath.push(path);

         const controller = helper.getController(app, path, middlewares);
         
         routerTree.add(app, method, path, middlewares, controller);

      }
   }

}
