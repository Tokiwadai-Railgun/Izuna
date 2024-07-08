const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "dbconfig-channel-welcome",
    permissions: [PermissionsBitField.Flags.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        const wlcChannelID = guildSettings.wlcChannel
        const wlcChannel = interaction.guild.channels.cache.get(wlcChannelID) ? interaction.guild.channels.cache.get(wlcChannelID) : "Aucun"

        // Premeir embed 
        const FirstEmbed = new EmbedBuilder()
            .setTitle("Configuration du salon de bienvenue")
            .setDescription("Le salon de logs répertorie l'arrivée de tous les membres dans le serveur")
            .addFields([
                { name: "Salon de logs actuel", value:`${wlcChannel}`}
            ])
            .setColor("#7F0856")

        // --- ボタン --- 
        const changeButton = new ButtonBuilder()
            .setLabel("Changer")
            .setCustomId("dbconfig-channel-welcome-change")
            .setStyle(ButtonStyle.Primary)

        const deleteButton = new ButtonBuilder()
            .setLabel("Supprimer")
            .setCustomId("dbconfig-channel-welcome-delete")
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder()
            .addComponents([changeButton, deleteButton])

        
        interaction.reply("Actualisation")
        interaction.message.edit({embeds:[FirstEmbed], components:[row]})
        interaction.deleteReply()
    }
}