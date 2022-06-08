const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "userinfo",
    usage: "clique droit sur l'utiisateur, application, userinfo",
    category: "users",
    type: "USER",
    permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
    runInteraction: async (Izuna, interaction) => {
        const member = await interaction.guild.members.fetch(interaction.targetId);

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.user.id})`, iconURL: member.user == Izuna.user? 'https://static.wikia.nocookie.net/worldtrigger/images/7/71/Replica_infobox.png/revision/latest/scale-to-width-down/150?cb=20140725024605': "" })
            .setColor("#8e48f7")
            .setImage(member.user.displayAvatarURL())
            .setThumbnail()
            .addFields(
                { name: "Nom", value: `${member.displayName}, inline: true` },
                { name: "Modérateur", value: `${member.kickable ? "🔴" : "🟢"}`, inline: true },
                { name: "Bot", value:`${member.user.bot? '🟢' : '🔴'}`, inline: true },
                { name: "Rôles", value: `${member.roles.cache.map(roles => roles).join(", ")}`, inline: true },
            )
        
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}