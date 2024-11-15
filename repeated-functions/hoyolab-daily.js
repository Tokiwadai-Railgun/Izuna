const { GenshinImpact, LanguageEnum, HonkaiStarRail } = require('hoyoapi');
const hoyolabData = require('../models/hoyolab.js');
const schedule = require('node-schedule');
const { EmbedBuilder } = require('discord.js');



module.exports = async (Izuna) => {
	console.log("Triggered schedue for hoyo daily")
    schedule.scheduleJob('0 0 8 * * *', async () => {
        const users = await hoyolabData.find();
        for (const genshin_user of users) {
            if (genshin_user.genshin_uid == 0) {console.log('User passed'); continue;};
            const hoyoapiConn = new GenshinImpact({
                cookie: {'ltuid_v2': genshin_user.ltuid, 'ltoken_v2': genshin_user.ltoken},
                lang: LanguageEnum.FRENCH,
                uid: genshin_user.genshin_uid
            });

            // claim the daily reward
            const daily = await hoyoapiConn.daily.claim();
            console.log("Daily claimed for user : ", genshin_user.genshin_uid)
            sendEmbed(Izuna, daily, genshin_user.discord_userId);
        }

        for (const hsr_user of users) {
            if (hsr_user.hsr_uid == 0 || !hsr_user.hsr_uid) continue;
            const hsrConn = new HonkaiStarRail({
                cookie: {'ltuid_v2': hsr_user.ltuid, 'ltoken_v2': hsr_user.ltoken},
                lang: LanguageEnum.FRENCH,
                uid: hsr_user.hsr_uid
            });

            const daily = await hsrConn.daily.claim()
            console.log("Daily claimed", daily.reward.award.name)
        }
    });
}

function sendEmbed(Izuna, daily, userId) {
  const user = Izuna.users.cache.get(userId);
  console.log(Izuna.users)
  console.log("User found : ", user)
  const logChannel = Izuna.channels.cache.get('926874969399500804');

  const logEmbed = new EmbedBuilder()
    .setColor("#7F0856")
    .setTitle("Récompense journalière")
    .setThumbnail(daily.reward.award.icon)
    .addFields([
        { name: "Statut : ", value: daily.status ? "Récompense récupérée ✅" : "Erreur lors de la collecte, déjà récupérée ?", inline: false },
        { name: "Récompense : ", value: `${daily.reward.award.name} * ${daily.reward.award.cnt}`, inline: false },
    ])
    .setTimestamp()
    .setFooter({ text: `${userId}`, iconURL: Izuna.user.displayAvatarURL() });

  logChannel.send({ embeds: [logEmbed] });
}
