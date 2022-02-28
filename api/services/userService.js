const User = require("../../models/User");

const getUser = async email => {
  const user = await User.findOne({ email }).lean().exec();

  return user;
};

const createUser = async userInfo => {
  const { email, profileUrl, nickname } = userInfo;

  const newUser = await User.create({
    email,
    profileUrl,
    nickname,
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

exports.getUser = getUser;
exports.createUser = createUser;
exports.updateRefreshToken = updateRefreshToken;
