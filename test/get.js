import test from 'jtm';

const { nats } = test;

test("get", async t => {

   const result = await nats.get("/user/");

   t.deepEqual({
      code: 0,
      data: 888,
      test: 'test middleware',
      token: 'token middleware'
   }, result);

});

test("get test", async t => {

   const result = await nats.get("/test/");

   t.deepEqual({
      code: 100,
      token: 'token middleware'
   }, result);

});

test("getById", async t => {

   const result = await nats.get("/user/12666");

   t.deepEqual({
      method: "findPk",
      params: { id: '12666' }
   }, result);

});
