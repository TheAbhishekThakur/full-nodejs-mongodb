const express = require("express");
const {
  nonBlocking,
  blockingProblem,
  blockingSolution,
} = require("../controllers/workerThread");
const {
  nonBlockingFourWorker,
  blockingProblemFourWorker,
  blockingSolutionFourWorker,
} = require("../controllers/workerThread/index-four-worker");
const router = express.Router();

router.get("/non-blocking", nonBlocking);
router.get("/blocking-problem", blockingProblem);
router.get("/blocking-solution", blockingSolution);

router.get("/non-blocking-four-worker", nonBlockingFourWorker);
router.get("/blocking-problem-four-worker", blockingProblemFourWorker);
router.get("/blocking-solution-four-worker", blockingSolutionFourWorker);

module.exports = router;
