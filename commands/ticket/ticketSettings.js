const { ActionRowBuilder, MessageButton, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "ticketsettings",
    aliases: ["tsettings"],
    category: "ticket",
    usage: "ticketSettings <Status>",
    permissions :[PermissionsBitField.Flags.Administrator],
    description: "configuration de la fonction ticket",
    run: async (Izuna, message, args) => { 
        message.reply("Développement de la commande en cours")
    },
    runInteraction: async (Izuna, interaction) => {
        interaction.reply("Développement de la commande en cours.")
    }
}