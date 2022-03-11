const { ERROR_MESSAGE } = require("../../../config/constants");
const Video = require("../../../models/Video");
const {
  saveVideo,
  deleteVideo,
  getVideos,
  getVideo,
} = require("../../services/userService");

const postUserVideo = async (req, res, next) => {
  const { userId } = req.params;
  const { videoURL, videoStreamingURL, gifURL } = req.body;

  try {
    await saveVideo(userId, videoURL, videoStreamingURL, gifURL);

    res.json({
      result: "ok",
    });
  } catch {
    res.json({
      error: {
        message: ERROR_MESSAGE.SERVER_ERROR,
        code: 500,
      },
    });
  }
};

const getUserVideos = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const videos = await getVideos(userId);

    res.json({
      videos,
    });
  } catch {
    res.json({
      error: {
        message: ERROR_MESSAGE.SERVER_ERROR,
        code: 500,
      },
    });
  }
};

const getUserVideo = async (req, res, next) => {
  const { videoId } = req.params;

  try {
    const video = await getVideo(videoId);

    res.json({
      video,
    });
  } catch {
    res.json({
      error: {
        message: ERROR_MESSAGE.SERVER_ERROR,
        code: 500,
      },
    });
  }
};

const deleteUserVideo = async (req, res, next) => {
  const { userId, videoId } = req.params;

  try {
    await deleteVideo(userId, videoId);

    res.json({
      reuslt: "ok",
    });
  } catch {
    res.json({
      error: {
        message: ERROR_MESSAGE.SERVER_ERROR,
        code: 500,
      },
    });
  }
};

exports.postUserVideo = postUserVideo;
exports.getUserVideos = getUserVideos;
exports.getUserVideo = getUserVideo;
exports.deleteUserVideo = deleteUserVideo;
