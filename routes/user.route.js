const express = require("express");
const router = express.Router();
const UserController = require("../controlers/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const PreferencesController = require("../controlers/preferences.controller.js");
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get(
  "/preferences",
  authMiddleware,
  PreferencesController.getPreferences
);
router.put(
  "/preferences",
  authMiddleware,
  PreferencesController.updatePreferences
);

module.exports = router;
