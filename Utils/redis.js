const { createClient } = require("redis");

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.on("connect", () => {
  console.log("Redis client connected");
});
redisClient.on("ready", () => {
  console.log("Redis client is ready");
});
redisClient.on("end", () => {
  console.log("Redis client disconnected");
});
redisClient.on("reconnecting", () => {
  console.log("Redis client reconnecting");
});

module.exports = { redisClient };
