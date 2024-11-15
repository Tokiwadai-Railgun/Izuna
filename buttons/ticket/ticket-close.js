const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits, Embed } = require('discord.js');

const responseEmbed = new EmbedBuilder()

    
module.exports = {
    name: "ticket-close",
    permissions :[PermissionsBitField.Flags.ViewChannel],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        const confirmationEmbed = new EmbedBuilder()
            .setTitle("Confirmation")
            .setDescription("Voulez-vous vraiment fermer ce ticket ? ")

        const conformationButton = new ButtonBuilder()
            .setCustomId("ticket-close-confirmation")
            .setLabel("Confirmer")
            .setStyle(ButtonStyle.Danger)

        const confirmationRow = new ActionRowBuilder()
            .setComponents(conformationButton)    
        // on demande vérification si on veut bien fermer le ticket

        interaction.reply({ embeds: [confirmationEmbed], components: [confirmationRow] })
    }
}