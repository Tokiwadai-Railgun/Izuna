const { ReactionUserManager, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "emit",
    category: "admin",
    aliases: ["emit"],
    usage: "emit <event>",
    specialArgs: ["guildMemberAdd", "guildMemberRemove", "guildCreate"],
    permissions: [PermissionsBitField.Flags.Administrator],
    description: "Simule un évènement au choix.",
    run: (Izuna, message, args) => {
        console.log(args[0]);
        if (!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove|guildCreate)$/)) return message.reply("Cet évènement n'est pas reconnus, voici la liste des évènement acceptés : `guildMemberAdd`, `guildMemberRemove`, `guildCreate`.");

        if (args[0] === "guildMemberAdd") {
            Izuna.emit("guildMemberAdd", message.member);
            message.reply("Simulation de l'arrivée d'un membre.");
        } else if (args[0] === "guildMemberRemove") {
            Izuna.emit("guildMemberRemove", message.member);
            message.reply("Simulation du départ d'un membre.");
        } else if (args[0] === "guildCreate") {
            if (message.author.id != 330026848052314112) return message.reply("Permissions insufisantes  (`bot owner`), commande annulée.");

            Izuna.emit("guildCreate", message.guild);
            message.reply("Simulation de la création d'un serveur.");
        }
    },
    options : [
        {
            name: "event",
            description: "L'évènement à simuler.",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: "guildMemberAdd", description: "L'arrivée d'un membre.", value: "guildMemberAdd" },
                { name: "guildMemberRemove", description: "La départ d'un membre.", value: "guildMemberRemove" },
                { name: "guildCreate", description: "La création d'un serveur.", value: "guildCreate" },
            ]
        }
    ],
    runInteraction: (Izuna, interaction) => {
        const evtChoice = interaction.options.getString("event");

        if (evtChoice === "guildMemberAdd") {
            Izuna.emit("guildMemberAdd", interaction.member);
            interaction.reply( {content: "Simulation de l'arrivée d'un membre.", ephemeral: true} );
        } else if (evtChoice === "guildMemberRemove") {
            Izuna.emit("guildMemberRemove", interaction.member);
            interaction.reply({content: "Simulation de la départ d'un membre.", ephemeral: true});
        } else if (evtChoice === "guildCreate") {
            if (interaction.user.id != 330026848052314112) return interaction.reply("Permissions insufisantes, commande annulée.");

            Izuna.emit("guildCreate", interaction.guild);
            interaction.reply({content: "Simulation de la création d'un serveur.", ephemeral: true});
        }


    }
}