const { MessageActionRow, MessageButton } = require('discord.js');

const buttons = new MessageActionRow()

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