const { storeFile, deleteFile } = require("../services/fileService.js");
const User = require("../models/User.js");

class UploadController {
  static async uploadFile(req, res) {
    const { apikey } = req.headers;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "No file uploaded!" });
    }

    if (!apikey) {
      return res.status(400).json({ msg: "No API key provided!" });
    }

    let user = await User.findOne({ apiKey: apikey });
    if (!user) {
      return res.status(400).json({ msg: "Invalid API key!" });
    }

    const fileType = file.mimetype.split("/")[0];
    if (fileType !== "image") {
      return res
        .status(400)
        .json({ msg: "You're only allowed to upload an image file" });
    }

    const base64File = file.buffer.toString("base64");

    const image = await storeFile(user.id, base64File);
    await deleteFile(image._id);

    res
      .status(200)
      .json({ msg: "File uploaded successfully", imageId: image.id });
  }
}

module.exports = UploadController;
