const mongoose = require('mongoose');

const securityShema = mongoose.Schema({
    guildId: String,
    adminRoles: { "type": Array, "default": "" },
    adminMembers: {type: Array, "default": ""},
    status: {type:  String, "default": "off"},
    spamProtectStatus: {type: String, "default": "off"},

});

module.exports = mongoose.model('Security', securityShema); 