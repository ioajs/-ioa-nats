"use strict";

const app = require('@app');
const NATS = require('nats');

const nats = NATS.connect(app.config);

module.exports = nats;
