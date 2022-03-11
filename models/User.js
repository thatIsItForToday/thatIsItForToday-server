const mongoose = require("mongoose");
const { isEmail, isURL } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [isEmail, "Must be a valid Email."],
  },
  photoURL: {
    type: String,
    require: true,
    validate: [isURL, "Must be a valid URL."],
  },
  displayName: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
    default: "",
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
