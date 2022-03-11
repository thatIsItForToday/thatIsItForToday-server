const { decodeToken } = require("../../utils/utils");

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const decodedEmail = await decodeToken(token);

  if (decodedEmail instanceof Error) {
    res.json({
      isInvalidToken: true,
    });

    return;
  }

  res.locals.decodedEmail = decodedEmail;
  next();
};

module.exports = validateToken;
