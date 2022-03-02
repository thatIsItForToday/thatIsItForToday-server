const mongoose = require("mongoose");
const { isURL } = require("validator");

const videoSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  videoURL: {
    type: String,
    required: true,
    validate: [isURL, "Must be a valid URL."],
  },
  gifURL: {
    type: String,
    required: true,
    validate: [isURL, "Must be a valid URL."],
  },
});

module.exports = mongoose.model("Video", videoSchema);
