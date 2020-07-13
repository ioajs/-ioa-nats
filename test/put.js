"use strict";

const test = require('jmr');

const { nats } = test;

test("put", async function (t) {

   const body = { t: 888 };

   const result = await nats.put("/user/1", body);

   t.deepEqual(result, {
      params: { id: '1' },
      body
   });

});
