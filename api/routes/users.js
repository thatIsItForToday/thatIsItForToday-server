const express = require("express");

const { deleteS3Video } = require("../middlewares/awsS3");
const {
  postUserVideo,
  deleteUserVideo,
} = require("./controllers/userController");

const router = express.Router();

// 토큰검증 미들웨어는 클라이언트 axios 인스턴스 설정 이후 넣을 예정
router.post("/:userId/video", postUserVideo);

router.delete("/:userId/videos/:videoId", deleteS3Video, deleteUserVideo);

module.exports = router;
