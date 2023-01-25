const FlutterWaveController = require("../controller/flutterwave");

module.exports = (router) => {
  router.post("/flutterwave", FlutterWaveController.getLink);
}

