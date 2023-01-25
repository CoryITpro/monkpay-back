const express = require("express");
const router = express.Router();
require('./user')(router);
require('./stripe')(router);
require('./flutterwave')(router);
require('./currencycloud')(router);
require('./transaction')(router);

module.exports = router;
