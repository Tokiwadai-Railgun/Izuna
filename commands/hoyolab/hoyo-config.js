const { EmbedBuilder, PermissionsBitField,ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "hoyo-config",
    aliases: ["g-config"],
    category: "hoyolab",
    usage: "genshin-config <ltoken> <ltuid> <uid>",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages ],
    description: "configure les données Genshin Impact pour l'utilisateur.",
    run: async (Izuna, message, args) => {
        message.reply("Commande uniquement disponnible en interaction pour le moment");
    },
    // add differents options
    options: [
        {
            name: "ltoken",
            description: "ltoken_v2",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "ltuid",
            description: "ltuid_v2",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "genshin_uid",
            description: "uid de gensin impact (0 si aucune)",
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: "hsr_uid",
            description: "uid de honkai star rail(0 si aucune)",
            type: ApplicationCommandOptionType.Integer,
            required: true
        }
    ],
    runInteraction: async (Izuna, interaction) => {
        // first get the two requried options
        const ltoken = interaction.options.getString("ltoken");
        const ltuid = interaction.options.getString("ltuid");
        const genshin_uid = interaction.options.getInteger("genshin_uid");
        const hsr_uid = interaction.options.getInteger("hsr_uid");

        console.log(ltoken, ltuid, genshin_uid, hsr_uid)

        // Check if the user already exist in the database
        const user = await Izuna.getHoyoData(interaction.user.id);
        if (user) {
            // if the user already exist, update the data
            const response = await Izuna.updateHoyoData(interaction.user.id, {discord_userId: interaction.user.id, ltoken: ltoken, ltuid: ltuid, genshin_uid: genshin_uid, hsr_uid: hsr_uid})
            interaction.reply({ content: "Données mise à jours", ephemeral: true})
        }
        else {
            // if the user doesn't exist, create the user
            const registeration = await Izuna.createHoyoData(interaction.user.id, ltoken, ltuid, genshin_uid, hsr_uid);
            interaction.reply({ content: `${registeration}`, ephemeral: true})
        }
    }
}
