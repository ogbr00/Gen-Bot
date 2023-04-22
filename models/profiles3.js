const mongoose = require("mongoose");

const members = mongoose.Schema({
    typenitro: String,
    typenitro2: String,
    numer: String,
    picid: String,
    date: String,
    time: String,
});

module.exports = mongoose.model("nhub stock", members);