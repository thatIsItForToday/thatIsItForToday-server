const { ERROR_MESSAGE } = require("../../../config/constants");
const { saveVideo, deleteVideo } = require("../../services/userService");

const postUserVideo = async (req, res, next) => {
  const { userId } = req.params;
  const { videoURL, gifURL } = req.body;

  try {
    await saveVideo(userId, videoURL, gifURL);

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
exports.deleteUserVideo = deleteUserVideo;
