const dayjs = require('dayjs');
const { MessageEmbed, Formatters } = require('discord.js');

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(Izuna, member) {
        const fetchGuild = await Izuna.getGuild(member.guild);

        if (member.guild.id !== "926874968925548554") return;
        const embed = new MessageEmbed()
            .setAuthor( {name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL()} )
            .setColor('#dc143c')
            .setDescription(`֍ Nom d'utilisateur : ${member.displayName}
            ֍ Créé le : <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            ֍ Rejoint le : <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            ֍ quitté le : <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)`)
            .setTimestamp()
            .setFooter( { text: `L'utilisateur à quitté` } )

        const bvnChannel = await Izuna.channels.fetch(fetchGuild.wlcChannel);
        bvnChannel.send({ embeds: [embed] })
    }
}