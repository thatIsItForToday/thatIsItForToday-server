const express = require("express");

const validateToken = require("../middlewares/tokenValidation");
const validateUser = require("../middlewares/userValidation");
const {
  getAutoLogin,
  postLogin,
  postSignup,
  postToken,
  putLogout,
} = require("./controllers/authController");

const router = express.Router();

router.get("/login", validateToken, getAutoLogin);

router.post("/login", validateUser, postLogin);

router.post("/signup", postSignup);

router.post("/token", validateToken, postToken);

router.put("/logout", putLogout);

module.exports = router;
