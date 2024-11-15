const mongoose = require('mongoose');

const genshinSchema = mongoose.Schema({
    discord_userId: Number,
    genshin_uid : {type: Number, default: null},
    hsr_uid: {type: Number, default: null},
    ltoken : String,
    ltuid : String,
});

module.exports = mongoose.model('hoyolab', genshinSchema);