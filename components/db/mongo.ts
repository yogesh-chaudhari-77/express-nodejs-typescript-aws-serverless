import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import { config } from "../environment/config";

let connection: Mongoose;

var options: ConnectOptions = {
  dbName: config!.MONGODB_DATABASE_NAME,
  user: config!.MONGODB_USER,
  pass: config!.MONGODB_PWD,
  autoIndex: Boolean(config!.MONGODB_AUTO_INDEX!), // Don't build indexes
  maxPoolSize: Number(config!.MONGODB_MAX_POOL_SIZE!), // Maintain up to 10 socket connections
};

const initialise = async () => {
  try {
    connection = await mongoose.connect(config.MONGODB_URI!, options);
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

const getConnection = async () => {
  await initialise();
  return connection.connection;
};

const closeConnection = () => {
  return mongoose.connection.close();
};

// Registering event handlers
mongoose.connection.on("connected", () => {
  console.log("MongoDB connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection Error: ", err);
});

export default { initialise, getConnection, closeConnection };
