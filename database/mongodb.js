const mongoose = require("mongoose");
const dbConfig = require("../config/dbConfig.js");

const MONGO_DB_CONNECTION_URL = dbConfig.MONGO_DB_CONNECTION_URL;

function connectToDb() {
  mongoose.connect(MONGO_DB_CONNECTION_URL);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
    console.log("An error occured!");
  });
}

module.exports = connectToDb;
