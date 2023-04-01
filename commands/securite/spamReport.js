const { ReactionUserManager, InteractionWebhook, EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const userGamesInfoModel = require("../../models/game.js")

module.exports = {
    name: "spam_report",
    category: "security",
    aliases: ["spamreport"],
    usage: "gameconfig <user>",
    permissions: [PermissionsBitField.Flags.SendMessages],
    ownerOnly: false,
    description: "Signaler un raid.",
    async run(Izuna, message) {
        message.reply("Commande uniquement disponnible via les / commands pour l'instant")
    },
    options : [
        {
            name: "user",
            description: "l'utilisateur que vous voulez signaler",
            type: ApplicationCommandOptionType.User,
            required: true
        }

    ],
    async runInteraction(Izuna, interaction) {
        const user = interaction.options.getMember("user");

        // récupérer les dernirs message envoyés dans le serveur
        for (i,v in pairs(interaction.guild.channels.fetch())) {
            const messages = v.messages.fetch({ limit: 10})

        }



        const guildMessages = []

        const messages
    }
}