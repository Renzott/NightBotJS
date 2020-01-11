const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  iniDate: Date,
  updateDate: Date
});

module.exports = mongoose.model("twitch", TaskSchema);
