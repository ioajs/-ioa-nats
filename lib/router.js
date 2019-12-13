"use strict";

const { $parent } = require('@app');
const { getController, createTree } = require('ioa-router/lib/common.js');
const { routerPath, method } = require('./common.js');

/**
 * 遍历父级app，添加routeron路由
 */
for (const name in $parent) {

   const app = $parent[name];

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
         const controller = getController(app, path, middlewares);
         createTree(app, method, path, middlewares, controller);

      }
   }

}
