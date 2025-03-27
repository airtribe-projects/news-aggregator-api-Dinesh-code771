const { User } = require("../modals/user.model");
const bcrypt = require("bcrypt");
class UserService {
  static async createUser(userData) {
    const user = await User.create(userData);
    return user;
  }
  static async login(email, password) {
    const user = await User.findOne({ email }).select(
      "name email preferences password _id"
    );

    return {
      name: user.name,
      email: user.email,
      preferences: user.preferences,
      _id: user._id,
      password: user.password,
    };
  }
}

module.exports = UserService;
