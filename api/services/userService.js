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

const saveVideo = async (id, videoURL, gifURL) => {
  const newVideo = await Video.create({
    videoURL,
    gifURL,
  });

  await User.updateOne({ _id: id }, { $push: { videos: newVideo.id } });
};

exports.getUser = getUser;
exports.createUser = createUser;
exports.updateRefreshToken = updateRefreshToken;
exports.saveVideo = saveVideo;
