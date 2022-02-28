const jwt = require("jsonwebtoken");

const createToken = payload => {
  const newAccessToken = jwt.sign(
    {
      payload,
    },
    process.env.TOKEN_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  const newRefreshToken = jwt.sign(
    {
      payload,
    },
    process.env.TOKEN_SECRET_KEY,
    {
      expiresIn: "14d",
    }
  );

  return { newAccessToken, newRefreshToken };
};

const decodeToken = async token => {
  const result = jwt.verify(
    token,
    process.env.TOKEN_SECRET_KEY,
    async (error, decode) => {
      if (error) {
        return error;
      }

      return decode.payload;
    }
  );

  return result;
};

exports.createToken = createToken;
exports.decodeToken = decodeToken;
