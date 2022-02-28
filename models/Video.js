const mongoose = require("mongoose");
const { isURL } = require("validator");

const videoSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  videoUrl: {
    type: String,
    validate: [isURL, "Must be a valid URL."],
  },
  gifUrl: {
    type: String,
    validate: [isURL, "Must be a valid URL."],
  },
});

module.exports = mongoose.model("Video", videoSchema);
