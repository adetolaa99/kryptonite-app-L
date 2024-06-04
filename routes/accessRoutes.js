const express = require("express");
const accessController = require("../controllers/accessController.js");

const AccessRouter = express.Router();

AccessRouter.get("/images", accessController.getAllImages);
AccessRouter.get("/images/:id", accessController.getImage);

module.exports = AccessRouter;
