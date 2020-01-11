const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const uriMongo = process.env.MONGODB_URI;

mongoose
  .connect(uriMongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log("db connect..."))
  .catch(err => console.log(err));

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../app/views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
module.exports = app;
