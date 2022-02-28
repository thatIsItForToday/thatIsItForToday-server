const express = require("express");

const auth = require("./routes/auth");
const users = require("./routes/users");

const api = express.Router();

api.use("/auth", auth);
api.use("/users", users);

module.exports = api;
