const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

    
module.exports = {
    name: "rule-validate",
    permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    runInteraction: async (Izuna, interaction, guildSettings) => {
    // on ajoute le rôle si la personne ne l'a pas déjà.
    const role = interaction.guild.roles.cache.get(guildSettings.memberRole)
    if (!role) return interaction.reply("L'administrateur du serveur n'a pas définis de rôle membre, contactez le pour régler le problème")

    interaction.member.roles.add(role)
    interaction.reply({content: `Bienvenue sur ${interaction.guild.name}`, ephemeral: true})
    // on lui envoie un message si il n'avais pas le rôle
    }
}