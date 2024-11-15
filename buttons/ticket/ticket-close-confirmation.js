const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits, Embed } = require('discord.js');

const responseEmbed = new EmbedBuilder()

    
module.exports = {
    name: "ticket-close-confirmation",
    permissions :[PermissionsBitField.Flags.ViewChannel],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        interaction.reply("Fermeture du ticket")
        interaction.channel.delete("Fermeture du ticket demandé par un utilisateur ou un membre du staff.")
        
    }
}