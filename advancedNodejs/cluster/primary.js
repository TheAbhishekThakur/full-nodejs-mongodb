const cluster = require("node:cluster");
const os = require("node:os");
const { dirname } = require("node:path");
const { fileURLToPath } = require("node:url");

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length;

console.log(`Number of CPU cores: ${cpuCount}`);
console.log(`Primary ID: ${process.pid}`);

cluster.setupPrimary({
  exec: __dirname + "/index.js",
});

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  console.log(
    `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
  );
  console.log("Starting a new worker");
  cluster.fork();
});
