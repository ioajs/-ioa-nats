"use strict";

const ioa = require('ioa');
const test = require('jmr');

ioa.app("./main");

test.nats = ioa.main.nats;

test.sleep = function(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time));
}