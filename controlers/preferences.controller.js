const { all } = require("axios");
const PreferencesService = require("../services/preferences.service");

class PreferencesController {
  static async getPreferences(req, res) {
    //find all users preferences
    const userId = req.user.userId;
    console.log(req.user);
    try {
      const allPreferences = await PreferencesService.getPreferences(userId);
      return res.status(200).json(allPreferences);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async updatePreferences(req, res) {
    const { preferences } = req.body;
    const userId = req.user.userId;
    const user = await PreferencesService.updatePreferences(
      userId,
      preferences
    );
    return res.status(200).json({ user });
  }
}

module.exports = PreferencesController;
