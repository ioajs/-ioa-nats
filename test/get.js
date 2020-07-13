"use strict";

const test = require('jmr');

const { nats } = test;

test("get", async t => {

   const result = await nats.get("/user/");

   t.deepEqual(result, {
      code: 0,
      data: 888,
      test: 'test middleware',
      token: 'token middleware'
   });

});

test("get test", async t => {

   const result = await nats.get("/test/");

   t.deepEqual(result, {
      code: 100,
      token: 'token middleware'
   });

});

test("getById", async t => {

   const result = await nats.get("/user/12666");

   t.deepEqual(result, {
      method: "findPk",
      params: { id: '12666' }
   });

});
