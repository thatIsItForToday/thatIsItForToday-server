const userService = require("../../services/userService");
const { ERROR_MESSAGE } = require("../../../config/constants");

const postSignup = async (req, res, next) => {
  const userInfo = req.body;

  try {
    const newUser = await userService.createUser(userInfo);

    res.json({
      user: newUser,
    });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      return {
        error: {
          message: ERROR_MESSAGE.DUPLICATE_KEY_ERROR,
          code: 400,
        },
      };
    }

    return {
      error: {
        message: ERROR_MESSAGE.SERVER_ERROR,
        code: 500,
      },
    };
  }
};

exports.postSignup = postSignup;
