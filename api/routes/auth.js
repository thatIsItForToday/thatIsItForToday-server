const express = require("express");

const validateToken = require("../middlewares/tokenValidation");
const validateUser = require("../middlewares/userValidation");
const {
  postSignup,
  getAutoLogin,
  postLogin,
  postToken,
  putLogout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", postSignup);
router.get("/login", validateToken, getAutoLogin);
router.post("/login", validateUser, postLogin);
router.post("/token", validateToken, postToken);
router.put("/logout", putLogout);

module.exports = router;
