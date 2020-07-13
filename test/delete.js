"use strict";

const test = require('jmr');

const { nats } = test;

test("post", async function (t) {

   const result = await nats.delete("/user/1");

   t.deepEqual(result, { t: 888 });

});
