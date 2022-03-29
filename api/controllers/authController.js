const { createToken } = require("../../utils/utils");
const { ERROR_MESSAGE } = require("../../config/constants");
const userService = require("../services/userService");

const postSignup = async (req, res, next) => {
  const { userInfo } = req.body;

  try {
    const newUser = await userService.createUser(userInfo);

    res.json({
      user: newUser,
    });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.json({
        error: {
          message: ERROR_MESSAGE.DUPLICATE_KEY_ERROR,
          code: 400,
        },
      });
    }

    res.json({
      error: {
        message: ERROR_MESSAGE.SERVER_ERROR,
        code: 500,
      },
    });
  }
};

const postLogin = async (req, res, next) => {
  const { email } = req.body;
  const { user } = res.locals;

  try {
    const { newAccessToken, newRefreshToken } = createToken(email);

    await userService.updateRefreshToken(email, newRefreshToken);

    res.json({
      user,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
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

const getAutoLogin = async (req, res, next) => {
  const { decodedEmail } = res.locals;

  try {
    const user = await userService.getUser(decodedEmail);

    res.json({
      user,
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

const postToken = async (req, res, next) => {
  const { decodedEmail: email } = res.locals;

  try {
    const { newAccessToken } = await createToken(email);

    res.json({
      accessToken: newAccessToken,
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

const putLogout = async (req, res, next) => {
  const { email } = req.body;

  try {
    await userService.updateRefreshToken(email);

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

exports.postSignup = postSignup;
exports.postLogin = postLogin;
exports.getAutoLogin = getAutoLogin;
exports.postToken = postToken;
exports.putLogout = putLogout;
