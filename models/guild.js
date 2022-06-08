const mongoose = require('mongoose');

const guildShema = mongoose.Schema({
    guildId: String,
    prefix: { "type": String, "default": "izu " },
    logChannel: { "type": String, "default": "926874969399500804" },
});

module.exports = mongoose.model('Guild', guildShema);