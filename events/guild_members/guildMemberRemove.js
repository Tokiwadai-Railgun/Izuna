const dayjs = require('dayjs');
const { EmbedBuilder, Formatters, AuditLogEvent } = require('discord.js');

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(Izuna, member) {
        const fetchGuild = await Izuna.getGuild(member.guild);
        const fetchKickAuditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberKick });
        const fetchBanAuditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberBanAdd });

        const kickLog = fetchKickAuditLogs.entries.first();
        const banLog = fetchBanAuditLogs.entries.first();

        const isBan = banLog != null && banLog.target.id === member.id;
        const isKick = kickLog != null && kickLog.target.id === member.id && kickLog.ti;


        if (member.guild.id !== "926874968925548554") return;
        const embed = new EmbedBuilder()
            .setAuthor( {name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL()} )
            .setColor('#dc143c')
            .setDescription(`֍ Nom d'utilisateur : ${member.displayName}
             <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            ֍ Rejoint le : <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            ֍ quitté le : <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)`)
            .setTimestamp()
            .setFooter( { text: `L'utilisateur à quitté` } )
            
            if (isBan || isKick) embed.addFields([{name: "Sanction(s) colléctée(s)", value: isKick && isBan? `Kick + ban` : isBan? `Ban` :"Kick"}]);
            if (isBan) embed.addFields([{ name: "֍ Kick  :", value: `Par : <@${banLog.executor.id}>, pour : ${banLog.reason}`, inline: true }, { name: "Raison : ", value: "`" + banLog.reason + "`" }]);
            if (isKick) embed.addFields([{ name: "֍ Bannis ", value: `Par : <@${kickLog.executor.id}>, pour : ${kickLog.reason}`, inline: true }, { name: "Raison : ", value: "`" + kickLog.reason + "`" }]);


        const bvnChannel = await Izuna.channels.fetch(fetchGuild.wlcChannel);
        bvnChannel.send({ embeds: [embed] })
    }
}