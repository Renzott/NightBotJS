const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  idStream: String,
  title: String,
  date: {
    initDate: String,
    updateDate: String
  },
  thumb: String,
  duration: String
});

module.exports = mongoose.model("twitch", TaskSchema);
