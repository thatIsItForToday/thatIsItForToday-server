const { ERROR_MESSAGE } = require("../../config/constants");
const userService = require("../services/userService");

const validateUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await userService.getUser(email);

    if (!user) {
      res.json({
        result: ERROR_MESSAGE.USER_DOES_NOT_EXIST,
      });

      return;
    }

    res.locals.user = user;
    next();
  } catch {
    res.json({
      error: {
        message: ERROR_MESSAGE.SERVER_ERROR,
        code: 500,
      },
    });
  }
};

module.exports = validateUser;
