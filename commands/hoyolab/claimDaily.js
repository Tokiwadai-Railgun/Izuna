const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { GenshinImpact, LanguageEnum, HonkaiStarRail} = require("hoyoapi");

module.exports = {
    name: "claim-daily",
    aliases: ["g-daily"],
    category: "hoyolab",
    usage: "claim-daily",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages ],
    description: "Récupère la récompense journalière de Genshin Impact, doit être configuré avec `/genshin-config`",
    run: async (Izuna, message, args) => {
        message.reply("Commande uniquement disponnible en interaction pour le moment");
    },
    options: [
        {
            name: "jeu",
            description: "Le jeu pour lequel vous voulez récupérer la récompense journalière",
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: "Genshin Impact", value: "genshin" },
                { name: "Honkai Star Rail", value: "hsr"}
            ],
            required: true
        }
    ],
    runInteraction: async (Izuna, interaction) => {
        // get the game from the options
        const game = interaction.options.getString("jeu");

        const userHoyoData = await Izuna.getHoyoData(interaction.user.id);
        if (!userHoyoData) return interaction.reply({ content: "Veuillez configurer vos données Hoyolab en utilisant la commande `/genshin-config`", ephemeral: true });

        switch (game) {
            case "genshin":
                const genshinResult = await claimGenshinDaily(Izuna, interaction);
                sendEmbed(genshinResult)
                break;
            case "hsr":
                const hsrResult = await claimHsrDaily(Izuna, interaction);
                sendEmbed(hsrResult)
                break;
        }


        async function claimGenshinDaily() {
            // Connect to the hoyoapi using the ltoken and ltuid of the user, if non throw an error embed
            const hoyoapiConn = new GenshinImpact({
                cookie: {'ltuid_v2': userHoyoData.ltuid, 'ltoken_v2': userHoyoData.ltoken},
                lang: LanguageEnum.FRENCH,
                uid: userHoyoData.genshin_uid
            });

            // claim the daily reward
            const daily = await hoyoapiConn.daily.claim();

            return daily;
        }

        async function claimHsrDaily() {
            const hsrConn = new HonkaiStarRail({
                cookie: {'ltuid_v2': userHoyoData.ltuid, 'ltoken_v2': userHoyoData.ltoken},
                lang: LanguageEnum.FRENCH,
                uid: userHoyoData.hsr_uid
            });

            const daily = await hsrConn.daily.claim()
            return daily
        }

        function sendEmbed(daily) {
            if (daily.status == "OK") {
                const logEmbed = new EmbedBuilder()
                    .setColor("#7F0856")
                    .setTitle("Récompense journalière")
                    .setThumbnail(daily.reward.award.icon)
                    .addFields([
                        { name: "Récompense : ", value: `${daily.reward.award.name} * ${daily.reward.award.cnt}`, inline: false },
                        { name: "Statut : ", value: "Récompense récupérée ✅", inline: false }
                    ])
                    .setTimestamp()
                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

                interaction.reply({ embeds: [logEmbed], ephemeral: true });
            } else if(daily.code == -5003){
                // generate an embed with the status cause might be already claimed
                const logEmbed = new EmbedBuilder()
                    .setColor("#7F0856")
                    .setTitle("Récompense journalière")
                    .setThumbnail(daily.reward.award.icon)
                    .addFields([
                        { name: "Statut : ", value: "Récompense déjà récupérée ✅", inline: false },
                        { name: "Récompense : ", value: `\`\`\`${daily.reward.award.name} * ${daily.reward.award.cnt}\`\`\``, inline: false },
                    ])
                    .setTimestamp()
                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

                interaction.reply({ embeds: [logEmbed], ephemeral: true });
            }
        }
    }
}