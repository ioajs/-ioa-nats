"use strict";

const { $release } = require('@app');
const getController = require('ioa-router/lib/getController.js');
const routerTree = require('./routerTree.js');
const common = require('./common.js');

/**
 * 遍历父级app，添加routeron路由
 */
for (const name in $release) {

   const app = $release[name];

   function register(method, path, middlewares) {

      const pathArray = path.split('/');

      if (pathArray[0] === '') {
         pathArray.shift();
      }

      if (pathArray[pathArray.length - 1] === '') {
         pathArray.pop();
      }

      path = pathArray.join("/");

      const controller = getController(app, path, middlewares);

      routerTree.add(app, method, path, middlewares, controller);

      const subPathArray = [];

      // params变量转通配符
      for (const item of pathArray) {
         if (item[0] === ':') {
            subPathArray.push("*");
         } else {
            subPathArray.push(item);
         }
      }

      common.subscribePaths.push(`${method}@${subPathArray.join(".")}`);

   }

   app.nrouter = {
      get(path, ...middlewares) {

         register('GET', path, middlewares);

      },
      post(path, ...middlewares) {

         register('POST', path, middlewares);

      },
      put(path, ...middlewares) {

         register('PUT', path, middlewares);

      },
      delete(path, ...middlewares) {

         register('DELETE', path, middlewares);

      }
   };

}
