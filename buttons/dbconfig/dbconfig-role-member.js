const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "dbconfig-role-member",
    permissions: [PermissionsBitField.Flags.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        const memberRoleID = guildSettings.memberRole
        const memberRole = interaction.guild.roles.cache.get(memberRoleID) ? interaction.guild.roles.cache.get(memberRoleID) : "Aucun"

        // Premeir embed 
        const FirstEmbed = new EmbedBuilder()
            .setTitle("Configuration du rôle membre")
            .setDescription("Ce rôle sert à définir les utilisateurs lambda du serveur, il sert ainsi à différencier les membres des personne venant de rejoindre il n'est cependant pas obligatoir de le préciser si vous n'utilisez pas des commandes le demandant.")
            .addFields([
                { name: "Rôle membre Actuel", value:`${memberRole}`}
            ])
            .setColor("#7F0856")

        // --- ボタン --- 
        const changeButton = new ButtonBuilder()
            .setLabel("Changer")
            .setCustomId("dbconfig-role-member-change")
            .setStyle(ButtonStyle.Primary)

        const deleteButton = new ButtonBuilder()
            .setLabel("Supprimer")
            .setCustomId("dbconfig-role-member-delete")
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder()
            .addComponents([changeButton, deleteButton])

        
        interaction.reply("Actualisation")
        interaction.message.edit({embeds:[FirstEmbed], components:[row]})
        interaction.deleteReply()
    }
}