const { getFileById, getAllFiles } = require("../services/fileService.js");

class AccessController {
  static async getAllImages(req, res) {
    try {
      const images = await getAllFiles();
      res.status(200).json(images);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }

  static async getImage(req, res) {
    const { id } = req.params;

    try {
      const image = await getFileById(id);
      if (!image) {
        return res.status(404).json({ msg: "Image not found" });
      }

      res.status(200).json(image);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
}

module.exports = AccessController;
