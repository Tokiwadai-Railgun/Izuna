const { ReactionUserManager, InteractionWebhook, EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField, channelLink, discordSort } = require("discord.js");
const { modelNames } = require("mongoose");
const userGamesInfoModel = require("../../models/game.js")

module.exports = {
    name: "spam_report",
    category: "securite",
    aliases: ["spamreport"],
    usage: "gameconfig <user>",
    permissions: [PermissionsBitField.Flags.SendMessages],
    ownerOnly: false,
    description: "Permet aux membres de stopper un raid, préviens les administrateurs.",
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

        // variables indispensables pour le fonctionnement du reste
        const guildMessages = []
        let index = 0;

        // récupération de tous les salons
        interaction.guild.channels.fetch()
        .then(guildChannels => {
          // on trie pour avoir uniquement les salons textuels
          const textChannels = guildChannels.filter(chan => chan.type === 0); // 0 = TextChannel

          for (let channel of textChannels.values()) {
            //maintenant on récupère les derniers messages dans les salons. 
            channel.messages.fetch({ limit: 1})
            .then(channelMessages => {
              // on trie les messages pour n'obtenir que ceux de l'utilisateur que l'on veut report
              const filteredMessages = channelMessages.filter(msg => msg.author.id === user.id)
              let i = 0;

              if (filteredMessages.size >= 1) interaction.channel.send(message.content, channel)
              //ensuite on les ajoute tous dans une tableau pour les récupérer par la suite
              for (let message of filteredMessages.values()) {
                guildMessages.push(message);
                
              }

              // suite à quoi on regarde si plusieurs messages sont identiques, si c'est le cas alors on mute l'utilisateur
              i++
              console.log("Size : " + filteredMessages.size)
              if (i == filteredMessages.size) {
                // console.log(`guildMessages: ${guildMessages}`)
              }
              
            })
            .catch(console.error);

            if (index >= textChannels.size) {
              // check si plusieurs fois le même message dans ceux récupérés.
              let i = 0;
              let counter = 0
              for (let message in guildMessages) {
                if (guildMessages.find(message)) counter ++
                i++;

                if (i = guildMessages.length && counter >= 3){
                  // on mute l'utilisateur
                  user.timeout();
                }
              }
              }
            }
            index ++;
          })
        }
}