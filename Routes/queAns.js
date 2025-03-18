const express = require("express");
const router = express.Router();
const QueAnsController = require("../controllers/queAns");

router.post("/create-queAns", QueAnsController.createQueAns);
router.post("/update-queAns", QueAnsController.updateQueAns);

module.exports = router;
