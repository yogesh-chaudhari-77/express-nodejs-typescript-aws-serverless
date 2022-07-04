import express from "express";
import { Express } from "express-serve-static-core";
import mongoose from "mongoose";
import mongo from "./components/db/mongo";
import cacheService from "./components/cache/redis.wrapper.service";

let app: Express;

app = express();

app.get("/", async (req, res, next) => {
  await mongo.getConnection();
  await mongoose.connection.db.listCollections().toArray(function (err, names) {
    console.log(names);
  });

  await cacheService.set("user-token", Math.random().toString());
  const valueFromCache = await cacheService.get("user-token");

  return res.status(200).json({
    message: "Hello from root!",
    valueFromCache: valueFromCache,
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export default app;
