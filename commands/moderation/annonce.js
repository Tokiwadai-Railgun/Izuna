const { EmbedBuilder, ApplicationCommandOptionType,PermissionsBitField  } = require('discord.js');
const { runInteraction } = require('../utils/ping');

module.exports = {
    name: "annonce",
    aliases: ["announce", "announcement"],
    usage: "izu annonce -> échange de mesages",
    category: "moderation",
    permissions :[PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.MentionEveryone],
    description: "Annonce un message à tous les membres du serveur sous forme d'un Embed.",
    run: (Izuna, message, args) => {
        const chan = message.channel
        const filter = m => m.author.id === message.author.id;
        let annonceChannel
        let annonceTitle


        chan.send("Veuillez mentionner le salon où vous souhaitez envoyer l'annonce.")

        chan.awaitMessages({
            filter: filter,
            max: 1,
            time: 30000,
            errors: ["time"]
        }).then(collected => {
            if (! collected.first().mentions || !collected.first().mentions.channels) {
                annonceChannel = chan;
            } else {
                annonceChannel = collected.first().mentions.channels.first();
            }

            chan.send("Veuillez entrer le sujet (titre) de l'annonce.")

            chan.awaitMessages({
                filter: filter,
                max: 1,
                time: 30000,
                errors: ["time"]
            }).then(coll => {
                annonceTitle = coll.first().content;

                chan.send("Veuillez entrer le contenu de l'annonce.")
                 
                chan.awaitMessages({
                    filter: filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                }).then(coll => {

                        const embed = new EmbedBuilder()
                        .setColor("#0099ff")
                        .setTitle(annonceTitle)
                        .setDescription(coll.first().content)
                        .setTimestamp()
                        .setFooter({ text: `Annonce par ${message.author.tag}`, icon: message.author.displayAvatarURL() })
                    annonceChannel.send({ embeds: [embed] })
                }).catch(err => chan.send("Temps écoulé!"))
            }).catch(err =>chan.send("Temps écoulé!"))
        }).catch(err => chan.send("Temps écoulé!"))
    },
    runInteraction: (Izuna, interaction) => {
        interaction.reply("Développement de la commande en cours...");
    }
}