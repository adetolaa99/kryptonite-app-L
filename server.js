const express = require("express");
require("dotenv").config();

const AuthRouter = require("./routes/authRoutes.js");
const ApiKeyRouter = require("./routes/apiKeyRoute.js");
const UploadRouter = require("./routes/uploadRoute.js");
const AccessRouter = require("./routes/accessRoutes.js");

const connectToDb = require("./database/mongodb.js");

const app = express();

// Connect to Mongodb Database
connectToDb();

//Add Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Kryptonite App Homepage!");
});

app.get("/api", (req, res) => {
  res.send("Hello from Kryptonite App API!");
});

// Use routes
app.use("/api/auth", AuthRouter);
app.use("/api/user", ApiKeyRouter);
app.use("/api/file", UploadRouter);
app.use("/api/access", AccessRouter);

//Error handler middleware
app.use((err, req, res, next) => {
  console.log(err);
  const errorStatus = err.status || 500;
  res.status(errorStatus).send(err.message);
  next();
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`The Kryptonian server is running on port ${port}`);
});
