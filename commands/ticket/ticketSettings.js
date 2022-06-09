const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "ticketSettings",
    aliases: ["tSettings"],
    category: "ticket",
    usage: "ticketSettings <Status>",
    permissions :["ADMINISTRATOR"],
    description: "configuration de la fonction ticket",
    run: async (Izuna, message, args) => { 
        message.reply("Développement de la commande en cours")
    },
    runInteraction: async (Izuna, interaction) => {
        interaction.reply("Développement de la commande en cours.")
    }
}