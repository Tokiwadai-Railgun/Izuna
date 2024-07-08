const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

const secondEmbed = new EmbedBuilder()
    .setTitle("Action nécessaire")
    .addFields([
        { name:"Conditions : ", value:"Pour pouvoir continuer cette action vous devez être propriétaire du serveur" }
    ])

const changeButton = new ButtonBuilder()
    .setCustomId("admin-role-change")
    .setLabel("changer")
    .setStyle(ButtonStyle.Primary)

const deleteButton = new ButtonBuilder()
    .setCustomId("admin-role-delete")
    .setLabel("Supprimer")
    .setStyle(ButtonStyle.Danger)
    
const row = new ActionRowBuilder()
    .setComponents(changeButton, deleteButton)

    
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