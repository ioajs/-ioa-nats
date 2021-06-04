import ioa from 'ioa';
import common from './common.js';
import loads from 'ioa-router/lib/loads.js';

const { app } = ioa;

// 自定义合并规则跳过同名属性，避免使用app.emit()产生命名冲突
const { $release } = app;
for (const name in $release) {
  const { loads: releaseLoads } = $release[name];
  for (const name in loads) {
    if (releaseLoads[name] === undefined) {
      releaseLoads[name] = loads[name];
    }
  }

}

const { jsonCodec } = common;

app.loader({
  "nats.js": {
    "level": 15,
    module(nats) {

      // 添加RPC事件发射器
      app.emit("nats", {
        get(path, options) {

          return this.request('GET', path, null, options);

        },
        post(path, data, options) {

          return this.request('POST', path, data, options);

        },
        put(path, data, options) {

          return this.request('PUT', path, data, options);

        },
        delete(path, options) {

          return this.request('DELETE', path, null, options);

        },
        request(method, path, data, options = {}) {

          const pathArray = path.split('/');

          if (pathArray[0] === '') {
            pathArray.shift();
          }

          if (pathArray[pathArray.length - 1] === '') {
            pathArray.pop();
          }

          const subscribePath = [];

          for (const item of pathArray) {
            if (item[0] === ':') {
              subscribePath.push("*");
            } else {
              subscribePath.push(item);
            }
          }

          const payload = jsonCodec.encode(data);

          return nats.request(`${method}@${subscribePath.join(".")}`, payload, { timeout: 1000, ...options })
            .then(msg => {
              // console.log(typeof msg);
              // if (msg instanceof Nats.NatsError && msg.code === Nats.REQ_TIMEOUT) {
              //   return {
              //     code: 1000,
              //     error: "响应超时"
              //   };
              // }
              return jsonCodec.decode(msg.data);
            })
            .catch(e => {
              return {
                code: 1000,
                error: e.message
              };
            });

        }
      });

      return nats;

    }
  },
  "register.js": {
    "level": 60
  },
  "subscribe.js": {
    "level": 100,
  },
})