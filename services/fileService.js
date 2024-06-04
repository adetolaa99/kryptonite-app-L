const Image = require("../models/Image.js");
const User = require("../models/User.js");

const storeFile = async (userId, base64File) => {
  const image = new Image({
    userId,
    base64: base64File,
  });
  await image.save();
  return image;
};

const getFileById = async (imageId) => {
  return await Image.findById(imageId).populate("userId");
};

const getAllFiles = async () => {
  return await Image.find().populate("userId");
};

module.exports = {
  storeFile,
  getFileById,
  getAllFiles,
};
