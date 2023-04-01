const { EmbedBuilder, ApplicationCommandType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "userinfo",
    usage: "clique droit sur l'utiisateur, application, userinfo",
    category: "users",
    type: ApplicationCommandType.User,
    permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    runInteraction: async (Izuna, interaction) => {
        const member = await interaction.guild.members.fetch(interaction.targetId);

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag} (${member.user.id})`, iconURL: member.user == Izuna.user? 'https://static.wikia.nocookie.net/worldtrigger/images/7/71/Replica_infobox.png/revision/latest/scale-to-width-down/150?cb=20140725024605': member.user.displayAvatarURL() })
            .setColor("#8e48f7")
            .setImage(member.user.displayAvatarURL())
            .addFields([
                { name: "Nom", value: `${member.displayName}` },
                { name: "Modérateur", value: `${member.kickable ? "🔴" : "🟢"}`, inline: true },
                { name: "Rôles", value: `${member.roles.cache.map(roles => roles).join(", ")}`, inline: true },
            ])
        

        if (member.user.bot) {
            embed.addFields([
                { name: "Bot", value:`🟢`, inline: false },
            ])
        }
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}