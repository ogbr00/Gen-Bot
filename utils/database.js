const mongoose = require("mongoose");
const { MongoDB } = require('../config.json')


const connect = () => {
    mongoose.connect(MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(() => {
        console.log("✅ | Connected to MongoDB");
    })
}

// Export functions
module.exports.connect = connect;