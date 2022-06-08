const dayjs = require('dayjs');
const { MessageEmbed, Formatters } = require('discord.js');

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(Izuna, member) {
        if (member.guild.id !== "926874968925548554") return;

        const accCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeAccCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);
        const joinedTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeJoinedTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);
        const leftTimestamp = Formatters.time(dayjs().unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeLeftTimestamp = Formatters.time(dayjs().unix(), Formatters.TimestampStyles.RelativeTime);


        const embed = new MessageEmbed()
            .setAuthor( {name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL()} )
            .setColor('#dc143c')
            .setDescription(`֍ Nom d'utilisateur : ${member.displayName}
            ֍ Créé le : ${accCreationTimestamp} (${relativeAccCreationTimestamp})
            ֍ Rejoint le : ${joinedTimestamp} (${relativeJoinedTimestamp})
            ֍ quitté le : ${leftTimestamp} (${relativeLeftTimestamp})`)
            .setTimestamp()
            .setFooter( { text: `L'utilisateur à quitté` } )

        const bvnChannel = await Izuna.channels.fetch("926874969210777682");
        bvnChannel.send({ embeds: [embed] })
    }
}