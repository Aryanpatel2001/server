import { Redis } from "ioredis";
require("dotenv").config();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("redis is connected");
    return process.env.REDIS_URL;
  }
  throw new Error("Redis connection failed");
};

export const redis = new Redis(redisClient(), {
  host: process.env.REDIS_HOST, // e.g., 'your-host.upstash.io'
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  tls: {}, // Required for secure connection to Upstash
  maxRetriesPerRequest: null,
});

