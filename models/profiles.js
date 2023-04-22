const mongoose = require("mongoose");

const members = mongoose.Schema({
  userid: String,
  key: String,
  created: String,
  date: String,
  time: String,
});

module.exports = mongoose.model("nhub keys", members);