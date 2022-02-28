const express = require("express");

const validateToken = require("../middlewares/tokenValidation");
const validateUser = require("../middlewares/userValidation");
const {
  getAutoLogin,
  postLogin,
  postSignup,
} = require("./controllers/authController");

const router = express.Router();

router.get("/login", validateToken, getAutoLogin);

router.post("/login", validateUser, postLogin);

router.post("/signup", postSignup);

module.exports = router;
