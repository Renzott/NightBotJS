const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

require("dotenv").config();

const app = express();

const uriMongo = process.env.MONGODB_URI;

mongoose
  .connect(uriMongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log("db connect..."))
  .catch((err) => console.log(err));

// moment - boda
app.set("moment", moment().subtract(2, "seconds"));
app.set("interval", 2);

// express engine
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../app/views"));

// express query body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

module.exports = app;
