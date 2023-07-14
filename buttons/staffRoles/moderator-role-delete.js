const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, Embed } = require('discord.js');

const thirdEmbed = new EmbedBuilder()
    .setTitle("Action Terminée")
    .addFields([
        { name:"Rôle modérateur actuel ", value:"aucun" }
    ])


    
    
module.exports = {
    name: "moderator-role-delete",
    permissions: [PermissionsBitField.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => { 
        Izuna.staffRoleEdit(interaction.guild, { moderatorRole : "" });

        interaction.reply("Actualisation")
        interaction.message.edit({ embeds: [thirdEmbed], components: [] })
        msg.first().delete()
    }
   
}