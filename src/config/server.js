const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../app/views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
module.exports = app;
