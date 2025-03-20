// How to use Multithreading with "worker threads" in Node.js?
const { Worker } = require("worker_threads");

const nonBlocking = (req, res) => {
  res.status(200).send("This page is non-blocking");
};

// Problem
const blockingProblem = (req, res) => {
  let counter = 0;
  for (let i = 0; i < 20_000_000_000; i++) {
    counter++;
  }
  res.status(200).send(`result is ${counter}`);
};

// Solution
const blockingSolution = (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`result is ${data}`);
  });

  worker.on("error", (error) => {
    res.status(404).send(`An error occured ${error}`);
  });
};

module.exports = {
  nonBlocking,
  blockingProblem,
  blockingSolution,
};
