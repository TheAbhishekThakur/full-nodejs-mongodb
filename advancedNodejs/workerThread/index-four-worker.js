// How to use Multithreading with "worker threads" in Node.js?
const { Worker } = require("worker_threads");

const THREAD_COUNT = 4;

const nonBlockingFourWorker = (req, res) => {
  res.status(200).send("This page is non-blocking");
};

// Problem
const blockingProblemFourWorker = (req, res) => {
  let counter = 0;
  for (let i = 0; i < 20_000_000_000; i++) {
    counter++;
  }
  res.status(200).send(`result is ${counter}`);
};

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./four-worker.js", {
      workerData: {
        thread_count: THREAD_COUNT,
      },
    });

    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", (error) => {
      reject(error);
    });
  });
}

// Solution
const blockingSolutionFourWorker = async (req, res) => {
  const workerPromises = [];

  for (let i = 0; THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  const thread_results = await Promise.all(workerPromises);
  const total =
    thread_results[0] +
    thread_results[1] +
    thread_results[2] +
    thread_results[3];

  res.status(200).send(`result is ${total}`);
};

module.exports = {
  nonBlockingFourWorker,
  blockingProblemFourWorker,
  blockingSolutionFourWorker,
};
