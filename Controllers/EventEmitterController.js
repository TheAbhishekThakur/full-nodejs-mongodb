// 13. Event Emmitter
// With the help of Event Emitter we can count api request call or do many other things
// Reference :- https://www.youtube.com/watch?v=mF2Iy3PLtQc

const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

let count = 0;

// Register a listener for count api request call
eventEmitter.on("start", () => {
  console.log(`API request count :- ${count++}`);
});

const firstApi = (req, res) => {
  res.status(200).send("firstApi");
  // Raise an event
  eventEmitter.emit("start");
};

const secondApi = (req, res) => {
  // Raise an event
  eventEmitter.emit("start");
  res.status(200).send("secondApi");
};

const thirdApi = (req, res) => {
  // Raise an event
  eventEmitter.emit("start");
  res.status(200).send("thirdApi");
};

module.exports = {
  firstApi,
  secondApi,
  thirdApi,
};
