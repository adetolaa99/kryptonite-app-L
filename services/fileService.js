const Image = require("../models/Image.js");

const storeFile = async (userId, base64File) => {
  const image = new Image({
    userId,
    base64: base64File,
  });
  await image.save();
  return image;
};

const deleteFile = async (imageId) => {
  const result = await Image.findByIdAndDelete(imageId);
  if (result) {
    return { success: true, message: "File deleted successfully." };
  } else {
    return { success: false, message: "File not found." };
  }
};

const getFileById = async (imageId) => {
  return await Image.findById(imageId).populate("userId");
};

const getAllFiles = async () => {
  return await Image.find().populate("userId");
};

module.exports = {
  storeFile,
  deleteFile,
  getFileById,
  getAllFiles,
};
