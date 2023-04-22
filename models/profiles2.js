const mongoose = require("mongoose");

const members = mongoose.Schema({
  seller: String,
  price: String,
  badge1: String,
  badge2: String,
  accountpic: String,
  billingpic: String,
  date: String,
  time: String,
});

module.exports = mongoose.model("nhub accounts", members);