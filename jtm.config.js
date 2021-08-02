import test from 'jtm';
import ioa from 'ioa';

await ioa.apps("./main");

console.log(ioa.main.nats)

test.nats = ioa.main.nats;

test.sleep = function(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time));
}