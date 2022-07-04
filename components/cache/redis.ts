import Redis from "ioredis";
import { config } from "../environment/config";

let redis: Redis;

// Connect to 127.0.0.1:6379
if (config.NODE_ENV === "local") {
  redis = new Redis();
} else {
  redis = new Redis(config.REDIS_CONNECTION_URI!);
}

export { redis };
