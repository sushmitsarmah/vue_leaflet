const mongoose = require('mongoose');
const CONFIG = require('../../config.json');

mongoose.connect(CONFIG.mongo_url);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log('mongo connected!!');
});

module.exports = db;