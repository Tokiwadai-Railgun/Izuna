const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "foo",
    aliases: ["buttonTest"],
    category: "utils",
    usage: "foo",
    permissions :["VIEW_CHANNEL", "SEND_MESSAGES"],
    description: "test des button",
    run: async (Izuna, message, args) => {
        
    },
    runInteraction: async (Izuna, interaction) => {

    }
}