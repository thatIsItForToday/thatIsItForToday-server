const User = require("../models/User");

const createUser = async userInfo => {
  const { email, profileUrl, nickname } = userInfo;

  const newUser = await User.create({
    email,
    profileUrl,
    nickname,
  });

  return newUser;
};

exports.createUser = createUser;
