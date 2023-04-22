const mongoose = require("mongoose");

const logs = mongoose.Schema({
    guild: String,
    channel: String,
});

module.exports = mongoose.model("ticketlogs", logs);