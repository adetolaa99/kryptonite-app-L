const express = require("express");

const apiKeyController = require("../controllers/apikeyController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const ApiKeyRouter = express.Router();

ApiKeyRouter.get(
  "/apikey",
  authMiddleware,
  apiKeyController.retrieveApiKey
);

module.exports = ApiKeyRouter;
