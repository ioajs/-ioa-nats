'use strict';

const app = require('@app');
const NATS = require('nats');
const loads = require('ioa-router/lib/loads.js');

// 自定义合并规则跳过同名属性，避免使用app.emit()产生命名冲突

const { $release } = app;

for (const name in $release) {

  const releaseLoads = $release[name].loads;

  for (const name in loads) {
    if (releaseLoads[name] === undefined) {
      releaseLoads[name] = loads[name];
    }
  }

}

app.loader({
  "nats.js": {
    "level": 15,
    module(nats) {

      // 添加RPC事件发射器
      app.emit("nats", {
        get(path, options) {

          return this._request(`GET:${path}`, null, options);

        },
        post(path, data, options) {

          return this._request(`POST:${path}`, data, options);

        },
        put(path, data, options) {

          return this._request(`PUT:${path}`, data, options);

        },
        delete(path, options) {

          return this._request(`DELETE:${path}`, null, options);

        },
        _request(path, data, options = {}) {

          options = {
            timeout: 1000,
            ...options
          }

          return new Promise(function (resolve) {

            nats.request(path, data, options, msg => {
              if (msg instanceof NATS.NatsError && msg.code === NATS.REQ_TIMEOUT) {
                resolve({
                  code: 1000,
                  error: "响应超时"
                });
              } else {
                resolve(msg);
              }
            });

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