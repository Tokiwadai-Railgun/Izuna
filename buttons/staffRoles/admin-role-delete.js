const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

const secondEmbed = new EmbedBuilder()
    .setTitle("Action nécessaire")
    .addFields([
        { name:"Conditions : ", value:"Pour pouvoir continuer cette action vous devez être propriétaire du serveur" }
    ])

const fourthEmbed = new EmbedBuilder()
    .setTitle("Modifications terminées")
    .addFields([
        { name: "Rôle administrateur actuel", value:"Aucun" }
    ])
    
module.exports = {
    name: "admin-role-delete",
    permissions: [PermissionsBitField.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        const ownerID = interaction.guild.ownerId
        if (interaction.user.id != ownerID) return interaction.reply("Permissions insuffisantes")
        // on supprime
        Izuna.staffRoleEdit(interaction.guild, { adminRole : ""})

        interaction.reply('Actualisation')
        interaction.message.edit({ embeds: [fourthEmbed], components: [] })
        interaction.deleteReply()
    }
   
}