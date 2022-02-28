require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const createError = require("http-errors");

const api = require("./api");
const indexRouter = require("./api/routes/index");

const app = express();
require("./config/db");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", api);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
