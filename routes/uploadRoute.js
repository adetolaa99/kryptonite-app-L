const express = require("express");
const multer = require("multer");
const uploadController = require("../controllers/uploadController.js");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const UploadRouter = express.Router();

UploadRouter.post(
  "/upload",
  upload.single("file"),
  uploadController.uploadFile
);

module.exports = UploadRouter;
