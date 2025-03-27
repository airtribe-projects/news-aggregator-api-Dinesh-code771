const mongoose = require("mongoose");
const Joi = require("joi");

//create a user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    type: [String],
    required: true,
  },
});

const User = mongoose.model("User", UserSchema, "users");

const validateUserSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(3).max(255).required().email(),
  password: Joi.string().min(3).max(255).required(),
  preferences: Joi.array().items(Joi.string()).required(),
});

module.exports = {
  User,
  validateUserSchema,
};

// User.create({
//     name: 'Clark Kent',
//     email: 'clark@superman.com',
//     password: 'Krypt()n8'
// });
