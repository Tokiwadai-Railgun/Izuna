const { ReactionUserManager } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const commandsFolder = readdirSync("./commands/");
const prefix = "izu ";

module.exports = {
    name: "help",
    aliases: ["h"],
    specialArgs: ["emit", "avatar", "userinfo", "annonce", "help", "ping", "poll"],
    category: "utils",
    usage: "help <commande> (pour plus de précision sur une commande)",
    permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
    description: "Création d'un sondage",
    run: async (Izuna, message, args) => {
        if (args.length === 0) {
            const listEmbed = new MessageEmbed()
                .setTitle("Liste des commandes")
                .setDescription("Voici la liste des commandes disponibles :")
                .setColor("#7F0856")
                .addField("Liste des commandes", `Une liste de toutes les catégories et commandes disponnibles. \n Pour plus d'informations sur une commande en particulier tapez : \`${prefix}help <command>\``)

                for (const category of commandsFolder) {

                    listEmbed.addField(
                        `֍ ${category.replace(/(^\w|\s\w)/g,firstLetter => firstLetter.toUpperCase())}`,
                        `\`${Izuna.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(", ")}\``
                    )

                .setTimestamp()
                .setFooter({ text: message.author.username, iconURL: message.author.avatarURL()});
                }

            return message.channel.send({embeds: [listEmbed]});
        } 

        // comme il y a eu un return on considère que si l'on est ici c'est qu'il n'y a eu un argument donc on va chercher la commande
        const command = Izuna.commands.get(args[0].toLowerCase());
        if (!command ) return message.reply("Commande indiquée introuvable !, tapez `izu help` pour voir la liste des commandes disponibles.");

        const argsEmbed = new MessageEmbed()
            .setTitle(`Informations sur la commande ${command.name}`)
            .setDescription(`Voici les informations sur la commande ${command.name} :`)
            .setColor("#7F0856")
            .addFields(
                { name: command.aliases[0] != command.name ? `Commande et aliases : ` : "Commande : ", value: command.aliases[0] != command.name ?`\`\`\`${command.name} | ${command.aliases.splice(0).join(", ")} \`\`\`` : `\`\`\`${command.name}\`\`\``, inline: true },
                { name: "Description : ", value: `\`\`\`${command.description}\`\`\``, inline: true },
                { name: "Permissions nessessaires : ", value: `\`\`\`${command.permissions.join(", ")}\`\`\``, inline: true },
                { name: "Utilisation : ", value: `\`\`\`${prefix}${command.usage}\`\`\` /!\\ ne pas include les <> dans les commandes /!\\`, inline: false },
            )
            .setTimestamp()
            .setFooter({ text: message.author.username, iconURL: message.author.avatarURL() });
            
            if (command.specialArgs) {
                argsEmbed.addField("Arguments prédéfinis :", `\`\`\`${command.specialArgs.slice(0).join(", ")}\`\`\``);
            }

        return message.channel.send({embeds: [argsEmbed]});
    },
    options : [
        {
            name: "command",
            description: "une commande",
            type: "STRING",
            required: false,
        }
    ],
    runInteraction: async (Izuna, interaction) => {
        const commandName = interaction.options.getString("command");

        if (!commandName) {
            // on créer l'embed qui va contenir la liste des commandes
            const listEmbed = new MessageEmbed()
            .setTitle("Liste des commandes")
            .setDescription("Voici la liste des commandes disponibles :")
            .setColor("#7F0856")
            .addField("Liste des commandes", `Une liste de toutes les catégories et commandes disponnibles. \n Pour plus d'informations sur une commande en particulier tapez : \`${prefix}help <command>\``)

            // on ajoute chaque commande grâce à une boucle qui parcours le dossier des commandes
            for (const category of commandsFolder) {

                listEmbed.addField(
                    `֍ ${category.replace(/(^\w|\s\w)/g,firstLetter => firstLetter.toUpperCase())}`,
                    `\`${Izuna.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(", ")}\``
                )

            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL()});
            }

        return interaction.reply({embeds: [listEmbed]});
        }

        // comme il y a eu un return on considère que si l'on est ici c'est qu'il n'y a eu un argument donc on va chercher la commande
        const command = Izuna.commands.get(commandName);
        if (!command ) return interaction.reply("Commande indiquée introuvable !, tapez `izu help` pour voir la liste des commandes disponibles.");

        const argsEmbed = new MessageEmbed()
            .setTitle(`Informations sur la commande ${command.name}`)
            .setDescription(`Voici les informations sur la commande ${command.name} :`)
            .setColor("#7F0856")
            .addFields(
                { name: command.aliases[0] != command.name ? `Commande et aliases : ` : "Commande : ", value: command.aliases[0] != command.name ?`\`\`\`${command.name} | ${command.aliases.splice(0).join(", ")} \`\`\`` : `\`\`\`${command.name}\`\`\``, inline: true },
                { name: "Description : ", value: `\`\`\`${command.description}\`\`\``, inline: true },
                { name: "Utilisation : ", value: `\`\`\`${prefix}${command.usage}\`\`\` /!\\ ne pas include les <> dans les commandes /!\\`, inline: true },
                { name: "Permissions nessessaires : ", value: `\`\`\`${command.permissions.join(", ")}\`\`\``, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() });
            
            if (command.specialArgs) {
                argsEmbed.addField("Arguments prédéfinis :", `\`\`\`${command.specialArgs.slice(0).join(", ")}\`\`\``);
            }

        return interaction.reply({embeds: [argsEmbed]});
    }
}