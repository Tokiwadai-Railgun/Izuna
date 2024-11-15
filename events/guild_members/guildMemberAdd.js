const dayjs = require('dayjs');
const { EmbedBuilder, Formatters } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(Izuna, member) {
        const fetchGuild = await Izuna.getGuild(member.guild);

        if (member.guild.id !== "926874968925548554" && member.guild.id !== "1194618758698905611") return;


        const embed = new EmbedBuilder()
            .setAuthor( {name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL()} )
            .setColor('#21ff81')
            .setDescription(`֍ Nom d'utilisateur : ${member}
            ֍ Créé le : <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            ֍ Rejoint le : <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`)
            .setTimestamp()
            .setFooter( { text: `L'utilisateur à rejoint` } )

        const bvnChannel = await Izuna.channels.fetch(fetchGuild.wlcChannel);
        bvnChannel.send({ embeds: [embed] })
    }
}
