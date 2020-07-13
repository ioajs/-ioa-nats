"use strict";

const test = require('jmr');

const { nats } = test;

test("crud", async function (t) {

  nats.post("/user/45");

  const getResult = await nats.get("/user/12");

  t.deepEqual(getResult, {
    method: 'findPk',
    params: { id: '12' }
  });

  nats.put("/user/66");

  const result = await nats.delete("/user/8", { "timeout": 3000 });

  t.deepEqual(result, { t: 888 });

});
