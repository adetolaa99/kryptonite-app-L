const User = require("../models/User.js");

class ApiKeyController {
  static async retrieveApiKey(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User is unauthorized!" });
      }

      const user = await User.findById(req.user.id);
      const apiKey = user.apiKey;

      res.json({ apiKey });
    } catch (err) {
      console.error("An error occured while retrieving API key:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = ApiKeyController;
