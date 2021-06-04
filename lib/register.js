import ioa from 'ioa';
import getController from 'ioa-router/lib/getController.js';
import common from './common.js';

const { $release } = ioa.app;
const { router, subjects } = common;

/**
 * @param {string} method 请求类型
 * @param {string} path 请求路径
 * @param {array} middlewares 中间件队列
 */
function register(method, path, app, middlewares) {

   const pathArray = path.split('/');

   if (pathArray[0] === '') {
      pathArray.shift();
   }

   if (pathArray[pathArray.length - 1] === '') {
      pathArray.pop();
   }

   path = pathArray.join("/");

   const controller = getController(app, path, middlewares);

   router.add(app, method, path, middlewares, controller);

   const subPathArray = [];

   // params变量转通配符
   for (const item of pathArray) {
      if (item[0] === ':') {
         subPathArray.push("*");
      } else {
         subPathArray.push(item);
      }
   }

   const subPath = subPathArray.join(".");

   subjects.push(`${method}@${subPath}`);

}

/**
 * 遍历发布组件，添加nrouter路由对象
 */
for (const name in $release) {

   const app = $release[name];

   app.nrouter = {
      get(path, ...middlewares) {

         register('GET', path, app, middlewares);

      },
      post(path, ...middlewares) {

         register('POST', path, app, middlewares);

      },
      put(path, ...middlewares) {

         register('PUT', path, app, middlewares);

      },
      delete(path, ...middlewares) {

         register('DELETE', path, app, middlewares);

      }
   };

}
