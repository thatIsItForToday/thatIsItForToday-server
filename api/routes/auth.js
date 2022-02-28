const express = require("express");

const validateUser = require("../middlewares/userValidation");
const { postLogin, postSignup } = require("./controllers/authController");

const router = express.Router();

router.post("/login", validateUser, postLogin);

router.post("/signup", postSignup);

module.exports = router;
