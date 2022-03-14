const express = require("express");

const { deleteS3Video } = require("../middlewares/awsS3");
const {
  postUserVideo,
  getUserVideos,
  getUserVideo,
  deleteUserVideo,
} = require("../controllers/userController");

const router = express.Router();

router.post("/:userId/video", postUserVideo);
router.get("/:userId/videos", getUserVideos);
router.get("/:userId/videos/:videoId", getUserVideo);
router.delete("/:userId/videos/:videoId", deleteS3Video, deleteUserVideo);

module.exports = router;
