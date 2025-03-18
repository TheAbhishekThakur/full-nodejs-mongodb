const express = require("express");
const router = express.Router();
const EventEmitterController = require("../controllers/eventEmitter");

router.get("/first", EventEmitterController.firstApi);
router.get("/second", EventEmitterController.secondApi);
router.get("/third", EventEmitterController.thirdApi);

module.exports = router;
