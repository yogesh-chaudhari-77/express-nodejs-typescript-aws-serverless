import { redis } from "./redis";

const set = async (key: string, value: string) => {
  redis.set(key, value);
};

const get = async (key: string) => {
  try {
    return redis.get(key);
  } catch (err) {
    console.log("Error occured while fetching the redis key: ", err);
  }

  return null;
};

export default { get, set };
