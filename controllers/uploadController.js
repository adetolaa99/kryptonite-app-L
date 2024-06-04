const { generateApiKey } = require("../services/apiKeyService.js");
const { storeFile } = require("../services/fileService.js");
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

    let user = await User.findOne({ apikey });
    if (!user) {
      const newApiKey = generateApiKey();
      user = new User({ apiKey: newApiKey });
      await user.save();
    }

    const fileType = file.mimetype.split("/")[0];
    if (fileType !== "image") {
      return res
        .status(400)
        .json({ msg: "You're only allowed to upload image files" });
    }

    const base64File = file.buffer.toString("base64");

    const image = await storeFile(user.id, base64File);

    res
      .status(200)
      .json({ msg: "File uploaded successfully", imageId: image.id });
  }
}

module.exports = UploadController;