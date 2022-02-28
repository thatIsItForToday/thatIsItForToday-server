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

exports.getUser = getUser;
exports.createUser = createUser;
