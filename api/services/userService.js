const User = require("../../models/User");
const Video = require("../../models/Video");

const getUser = async email => {
  const user = await User.findOne({ email }).lean().exec();

  return user;
};

const createUser = async userInfo => {
  const { email, displayName, photoURL } = userInfo;

  const newUser = await User.create({
    email,
    displayName,
    photoURL,
  });

  return newUser;
};

const updateRefreshToken = async (email, token) => {
  if (!token) {
    await User.updateOne({ email }, { refreshToken: "" }).exec();

    return;
  }

  await User.updateOne({ email }, { refreshToken: token }).exec();
};

const saveVideo = async (id, videoURL, videoStreamingURL, gifURL) => {
  const newVideo = await Video.create({
    videoURL,
    videoStreamingURL,
    gifURL,
  });

  await User.updateOne({ _id: id }, { $push: { videos: newVideo.id } });
};

const getVideos = async userId => {
  const { videos } = await User.findById(userId)
    .populate("videos")
    .select("videos")
    .lean()
    .exec();

  return videos;
};

const getVideo = async videoId => {
  const video = await Video.findById(videoId).lean().exec();

  return video;
};

const deleteVideo = async (userId, videoId) => {
  await Promise.all([
    User.updateOne({ _id: userId }, { $pull: { videos: videoId } }),
    Video.deleteOne({ _id: videoId }),
  ]);
};

exports.getUser = getUser;
exports.createUser = createUser;
exports.updateRefreshToken = updateRefreshToken;
exports.saveVideo = saveVideo;
exports.getVideos = getVideos;
exports.getVideo = getVideo;
exports.deleteVideo = deleteVideo;
