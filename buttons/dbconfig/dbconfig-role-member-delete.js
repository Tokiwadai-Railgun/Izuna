const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');


module.exports = {
    name: "dbconfig-role-member-delete",
    permissions: [PermissionsBitField.Flags.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        const memberRoleID = guildSettings.memberRole
        const memberRole = interaction.guild.roles.cache.get(memberRoleID) ? interaction.guild.roles.cache.get(memberRoleID) : "Aucun"

        Izuna.updateGuild(interaction.guild, { memberRole : "" });

        // Premeir embed 
        const thirdEmbed = new EmbedBuilder()
            .setTitle("Modification terminée")
            .setDescription("Il n'y a désormais plus de rôle membre")
            .setColor("#7F0856")
            
        
        interaction.reply("Actualisation")
        interaction.message.edit({embeds:[thirdEmbed], components:[]})
        interaction.deleteReply()
    }
}