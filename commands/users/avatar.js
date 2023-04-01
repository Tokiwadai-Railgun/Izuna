const { EmbedBuilder, ApplicationCommandType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "userAvatar",
    usage: "clique droit sur l'utiisateur, application, userAvatar",
    category: "users",
    type: ApplicationCommandType.User,
    permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    runInteraction: async (Izuna, interaction) => {
        const member = await interaction.guild.members.fetch(interaction.targetId);
        
        interaction.reply(member.user.displayAvatarURL());
    }
}