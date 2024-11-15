const mongoose = require('mongoose');

const userDuGroupeXpData = mongoose.Schema({
    userId: { "type": String },
    userXp: { "type": Number, "default": 0 },
    userLevel: { "type": Number, "default": 1 },
    userCoins: { "type": Number, "default": 0 },
    userCreateTag: { "type": String, "default": "" }, 
});

module.exports = mongoose.model('userDuGroupeXpData', userDuGroupeXpData); 