const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');


module.exports = {
    name: "admin-role-action",
    permissions: [PermissionsBitField.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        const ownerID = interaction.guild.ownerId
        if (interaction.user.id != ownerID) return interaction.reply("Permissions insuffisantes")

        const previousMessage = interaction.message

        interaction.reply("Actualisation")
        previousMessage.edit({ embeds: [secondEmbed], components: [row] })
        interaction.deleteReply()
    }
   
}
// status ボタン
const globalStatusButton = new ButtonBuilder()
.setLabel("Status global")
.setCustomId("security-status-global")
.setStyle(ButtonStyle.Primary)

const spamProtectStatus = new ButtonBuilder()
.setLabel("Fonction Anti-spam")
.setCustomId("security-status-spamprotect")
.setStyle(ButtonStyle.Primary)

const inviteBlockStatus = new ButtonBuilder()
.setLabel("Bloquage des invitations")
.setCustomId("security-status-inviteblock")
.setStyle(ButtonStyle.Primary)