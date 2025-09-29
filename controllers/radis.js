const { redisClient } = require("../utils/redis");

const setData = async (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).json({ error: "Key and value are required" });
  }
  try {
    await redisClient.set(key, value);
    console.log(`Data set: ${key} = ${value}`);
    return true;
  } catch (err) {
    console.error("Error setting data:", err);
  }
};

const getData = async (req, res) => {
  const { key } = req.params;
  try {
    const value = await redisClient.get(key);
    console.log(`Data retrieved: ${key} = ${value}`);
    return value;
  } catch (err) {
    console.error("Error getting data:", err);
  }
};

const deleteData = async (req, res) => {
  try {
    const { key } = req.params;
    await redisClient.del(key);
    console.log(`Data deleted: ${key}`);
    return true;
  } catch (err) {
    console.error("Error deleting data:", err);
  }
};

const flushAll = async () => {
  try {
    await redisClient.flushAll();
    console.log("All data flushed");
    return true;
  } catch (err) {
    console.error("Error flushing data:", err);
  }
};

const getKeys = async () => {
  try {
    const keys = await redisClient.keys("*");
    console.log("Keys retrieved:", keys);
    return keys;
  } catch (err) {
    console.error("Error getting keys:", err);
  }
};

const getKeyInfo = async (key) => {
  try {
    const info = await redisClient.dump(key);
    console.log(`Key info retrieved: ${key} = ${info}`);
    return info;
  } catch (err) {
    console.error("Error getting key info:", err);
  }
};

const getType = async (key) => {
  try {
    const type = await redisClient.type(key);
    console.log(`Key type retrieved: ${key} = ${type}`);
    return type;
  } catch (err) {
    console.error("Error getting key type:", err);
  }
};

const getTTL = async (key) => {
  try {
    const ttl = await redisClient.ttl(key);
    console.log(`Key TTL retrieved: ${key} = ${ttl}`);
    return ttl;
  } catch (err) {
    console.error("Error getting key TTL:", err);
  }
};

const getKeysCount = async () => {
  try {
    const count = await redisClient.dbSize();
    console.log("Keys count retrieved:", count);
    return count;
  } catch (err) {
    console.error("Error getting keys count:", err);
  }
};
const getInfo = async () => {
  try {
    const info = await redisClient.info();
    console.log("Redis server info retrieved:", info);
    return info;
  } catch (err) {
    console.error("Error getting Redis server info:", err);
  }
};
const getConfig = async () => {
  try {
    const config = await redisClient.config("GET", "*");
    console.log("Redis server config retrieved:", config);
    return config;
  } catch (err) {
    console.error("Error getting Redis server config:", err);
  }
};

module.exports = {
  setData,
  getData,
  deleteData,
  flushAll,
  getKeys,
  getKeyInfo,
  getType,
  getTTL,
  getKeysCount,
  getInfo,
  getConfig,
};
