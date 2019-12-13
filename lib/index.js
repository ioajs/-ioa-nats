'use strict';

const app = require('@app');
const loads = require('ioa-router/lib/loads.js');

app.emit("loads", loads);

app.loader({
   "nats.js": {
      "level": 15,
      module(nats) {

         // 添加rpc事件发射器
         app.emit("rpc", {
            get(path) {

               return this._base("/GET/" + path);

            },
            post(path, data) {

               return this._base("/POST/" + path, data);

            },
            put(path, data) {

               return this._base("/PUT/" + path, data);

            },
            delete(path) {

               return this._base("/DELETE/" + path);

            },
            _base(...args) {

               return new Promise(function (resolve) {

                  nats.request(...args, { timeout: 1500 }, resolve);

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

            }
         });

         return nats;

      }
   },
   "router.js": {
      "level": 60
   },
   "event.js": {
      "level": 100,
   },
})