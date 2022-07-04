import serverless from "serverless-http";
import "dotenv/config";
import app from "./app";

module.exports.handler = serverless(app);
