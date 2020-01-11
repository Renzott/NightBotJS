const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  urlString: String,
  lastdirect: String,
  initDate: Date,
  updateDate: Date
});

module.exports = mongoose.model("twitch", TaskSchema);
