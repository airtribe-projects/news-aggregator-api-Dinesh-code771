const { User } = require("../modals/user.model");

class PreferencesService {
  static async getPreferences(userId) {
    //find preferences with respected to user id
    const preferences = await User.findById(userId, "preferences -_id");
    return preferences;
  }
  static async updatePreferences(userId, preferences) {
    const user = await User.findByIdAndUpdate(userId, { preferences });
    return user;
  }
  static async getPreferencesByUserId(userId) {
    const user = await User.findById(userId);
    return user.preferences;
  }
}

module.exports = PreferencesService;
