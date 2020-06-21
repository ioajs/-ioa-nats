"use strict";

const app = require('@app');
const NATS = require('nats');
const consoln = require('consoln');

const nats = NATS.connect(app.config);

nats.on('connect', function () {

  consoln.success(`nats connection success`);

  nats.on('disconnect', (error) => {
     consoln.error(`nats disconnect`);
  });

  nats.on('error', function (error) {
     consoln.error(error);
  });

});

module.exports = nats;
