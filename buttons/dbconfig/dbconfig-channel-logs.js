const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "dbconfig-channel-logs",
    permissions: [PermissionsBitField.Flags.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        const logChannelID = guildSettings.logChannel
        const logChannel = interaction.guild.channels.cache.get(logChannelID) ? interaction.guild.channels.cache.get(logChannelID) : "Aucun"

        // Premeir embed 
        const FirstEmbed = new EmbedBuilder()
            .setTitle("Configuration du salon d'archives")
            .setDescription("Le salon d'archives répertorie toutes les actions effectués par l'équipe de modération et peut être compléter par un salon d'archives pour les actions des membres")
            .addFields([
                { name: "Salon d'archive actuel", value:`${logChannel}`}
            ])
            .setColor("#7F0856")

        // --- ボタン --- 
        const changeButton = new ButtonBuilder()
            .setLabel("Changer")
            .setCustomId("dbconfig-channel-logs-change")
            .setStyle(ButtonStyle.Primary)

        const deleteButton = new ButtonBuilder()
            .setLabel("Supprimer")
            .setCustomId("dbconfig-channel-logs-delete")
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder()
            .addComponents([changeButton, deleteButton])

        
        interaction.reply("Actualisation")
        interaction.message.edit({embeds:[FirstEmbed], components:[row]})
        interaction.deleteReply()
    }
}