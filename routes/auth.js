const express = require("express");

const { postSignup } = require("../controllers/authController");

const router = express.Router();

router.post("/login", (req, res, next) => {});

router.post("/signup", postSignup);

module.exports = router;
