import test from 'jtm';

const { nats } = test;

test("post", async function (t) {

   const result = await nats.delete("/user/1");

   t.deepEqual(result, { t: 888 });

});
