const UserService = require("../services/user.service");
const bcrypt = require("bcrypt");
const { validateUserSchema } = require("../modals/user.model");
const jwt = require("jsonwebtoken");
class UserController {
  static async signup(req, res) {
    const { name, email, password, preferences } = req.body;
    //validate user input using joi
    const { error } = validateUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //use bcrypt to hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await UserService.createUser({
        name,
        email,
        password: hashedPassword,
        preferences,
      });
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ user, token });
  }
}

module.exports = UserController;
