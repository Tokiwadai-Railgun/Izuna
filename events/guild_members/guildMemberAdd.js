const dayjs = require('dayjs');
const { MessageEmbed, Formatters } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(Izuna, member) {

        if (member.guild.id !== "926874968925548554") return;
        const accCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeAccCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);
        const joinedTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeJoinedTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);


        const embed = new MessageEmbed()
            .setAuthor( {name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL()} )
            .setColor('#21ff81')
            .setDescription(`֍ Nom d'utilisateur : ${member}
            ֍ Créé le : ${accCreationTimestamp} (${relativeAccCreationTimestamp})
            ֍ Rejoint le : ${joinedTimestamp} (${relativeJoinedTimestamp})`)
            .setTimestamp()
            .setFooter( { text: `L'utilisateur à rejoint` } )

        const bvnChannel = await Izuna.channels.fetch("926874969210777682");
        bvnChannel.send({ embeds: [embed] })
    }
}