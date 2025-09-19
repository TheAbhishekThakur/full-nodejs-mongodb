const express = require("express");
const router = express.Router();
const RadisController = require("../controllers/radis");

router.post("/set-data", RadisController.setData);
router.get("/get-data/:key", RadisController.getData);
router.delete("/delete-data/:key", RadisController.deleteData);
router.delete("/flush-all", RadisController.flushAll);
router.get("/ping", RadisController.ping);
router.get("/info", RadisController.info);
router.get("/get-keys", RadisController.getKeys);
router.get("/get-key-info/:key", RadisController.getKeyInfo);

module.exports = router;
