const Redis = require("ioredis");

const redis = new Redis({
  host: "localhost",
  port: 6379,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

// Function to clear all Redis cache
const clearCache = async () => {
  try {
    await redis.flushall();
    console.log("Redis cache cleared successfully");
  } catch (error) {
    console.error("Error clearing Redis cache:", error);
    throw error;
  }
};

module.exports = {
  redis,
  clearCache,
};
