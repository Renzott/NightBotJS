const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const uriMongo = `mongodb://${process.env.API_MD_KEY}@ds111113.mlab.com:11113/heroku_c97l8n46`;

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
