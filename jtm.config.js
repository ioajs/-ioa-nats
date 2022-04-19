import test from 'jtm';
import ioa, { createApp } from 'ioa';

await createApp({ main: "./main" });

// console.log(ioa.main.nats);

test.nats = ioa.main.nats;

test.sleep = function (time = 0) {
  return new Promise(resolve => setTimeout(resolve, time));
}