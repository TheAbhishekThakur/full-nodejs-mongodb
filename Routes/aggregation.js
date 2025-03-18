const express = require("express");
const router = express.Router();
const AggregationController = require("../controllers/aggregation");

router.post("/find-one", AggregationController.findOneDoc);
router.post("/find-two", AggregationController.findOneDoc2);

module.exports = router;
