import test from 'jtm';
import ioa from 'ioa';

await ioa.loadApp("./main");

test.nats = ioa.main.nats;

test.sleep = function(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time));
}