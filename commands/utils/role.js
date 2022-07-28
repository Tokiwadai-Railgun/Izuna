const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

const menu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId("role_add-menu")
            .setPlaceholder("Choisissez un rôle")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                { label: "Dev rôle", value: "926874969009422357", description: "Rôle pour les développeurs" },
                { label: "Rôle membre", value:"926874968975896636", description: "Rôle pour les membres" },
            ])

        )


module.exports = {
    name: "role",
    aliases: ["role"],
    category: "utils",
    usage: "foo",
    permissions :["VIEW_CHANNEL", "SEND_MESSAGES"],
    description: "test du menu",
    run: async (Izuna, message, args) => { 
        message.channel.send({ content: "voici le menu", components: [menu] });
    },
    runInteraction: async (Izuna, interaction) => {
        interaction.reply({ content: "voici le menu", components: [menu] });
    }
}