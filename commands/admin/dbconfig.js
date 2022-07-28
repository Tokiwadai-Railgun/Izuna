const { ReactionUserManager, InteractionWebhook, ApplicationCommandOptionType } = require("discord.js");
module.exports = {
    name: "dbconfig",
    category: "admin",
    aliases: ["emit"],
    usage: "dbconfig <key> [value]",
    specialArgs: ["prefix", "logchannel","wlcChannel", "(correspod  à <key>)"],
    permissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    description: "Configurer les donnés relative au serveur.",
    async run(Izuna, message, args, guildSettings) {
        console.log(args[0]);
        if (!args[0] || !args[0].match(/^(prefix|logChannel|wlcChannel)$/)) return message.reply(`Clefs non valide ou non précisée, tapez ` + "``" + guildSettings.prefix + "help dbconfig" + "``" + ` pour la liste des clefs.`);

        const key = args[0];
        const value = args[1];

        if (key === "logChannel") {
            if (value) {
                if (!message.guild.channels.cache.has(value)) return message.reply("Ce salon n'existe pas.");

                await Izuna.updateGuild(message.guild, { logChannel: value.id })
                return message.reply({content: `Le nouveau salon de logs est : ${message.guild.channels.cache.get(value.id)}.`});

            } else {
                message.reply({content: `Le salon de logs est actuellement : ${message.guild.channels.cache.get(guildSettings.logChannel)}`});
            }
        } else if (key === "prefix") {
            if (value) {
                if (value == message.mentions.members.first() || value == message.mentions.channels.first()) return message.reply("Format de prefix invalide.");

                if (value === "base") {
                    await Izuna.updateGuild(message.guild, { prefix: "izu " })
                    return message.reply({content: `Le nouveau prefix est : izu .`});
                } else {
                    await Izuna.updateGuild(message.guild, { prefix: value })
                    return message.reply({content: `Le nouveau prefix est : ${value}.`});
                }


            } else {
                message.reply({content: `Le prefix est actuellement : ${guildSettings.prefix}`});
            }
        } else if (key === "wlcChannel") {
            if (value) {
                await Izuna.updateGuild(message.guild, { wlcChannel: value.id })
                return message.reply({content: `Le nouveau salon de bienvenue est : ${message.guild.channels.cache.get(value.id)}`});
            }
        }  else {
            message.reply("Clef invalide")
        }
        
    },
    options : [
        {
            name: "key",
            description: "Ce que vous voulez changer.",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "logChannel",
                    value: "logChannel",
                    description: "Le channel de log du serveur."
                },
                {
                    name: "prefix",
                    value: "prefix",
                    description: "Le prefix sur le serveur."
                },
                {
                    name: "wlcChannel",
                    value: "wlcChannel",
                    description: "Le channel de bienvenue du serveur."
                }
            ]
        },
        {
            name: "value",
            description: "Eventuelle modification à apporter (id pour le salon).",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    async runInteraction(Izuna, interaction, guildSettings) {
        const key = interaction.options.getString("key");
        const value = interaction.options.getString("value");

        if (key === "logChannel") {
            if (value) {
                await Izuna.updateGuild(interaction.guild, { logChannel: value })
                return interaction.reply({content: `Le nouveau salon de logs est : ${interaction.guild.channels.cache.get(value)}`});

            } else {
                interaction.reply({content: `Le salon de logs est actuellement : ${interaction.guild.channels.cache.get(guildSettings.logChannel)}`});
            }
        } else if (key === "prefix") {
            if (value) {
                await Izuna.updateGuild(interaction.guild, { prefix: value })
                return interaction.reply({content: `Le nouveau prefix est : ${value}}`});

            } else {
                interaction.reply({content: `Le prefix est actuellement : ${guildSettings.prefix}`});
            }
        } else if (key === "wlcChannel") {
            if (value) {
                await Izuna.updateGuild(interaction.guild, { wlcChannel: value })
                return interaction.reply({content: `Le nouveau channel de bienvenue est : ${interaction.guild.channels.cache.get(value)}`});
            }
        } 
        
        else {
            interaction.reply("Clef invalide")
        }


    }
}