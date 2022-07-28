const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { runInteraction } = require('../utils/ping');

module.exports = {
    name: "annonce",
    aliases: ["announce", "announcement"],
    usage: "izu annonce <contenus>",
    category: "moderation",
    permissions :["VIEW_CHANNEL", "SEND_MESSAGES", "MENTION_EVERYONE"],
    description: "Annonce un message à tous les membres du serveur sous forme d'un Embed.",
    run: (Izuna, message, args) => {

        const annonceEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle("Annonce")
            .setThumbnail(message.author.displayAvatarURL())
            .addFields([{value: args.join(" ")}])
            .setTimestamp()

        }, runInteraction(Izuna, interaction) {
        message.reply("Développement de la commande en cours...");
    },
    runInteraction: (Izuna, interaction) => {
        interaction.reply("Développement de la commande en cours...");
    }
}