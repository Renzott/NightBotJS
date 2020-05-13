const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  pareja: Object,
  fecha: String,
});

module.exports = mongoose.model("boda", TaskSchema);
