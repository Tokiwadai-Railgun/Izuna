const ms = require('ms');
const { EmbedBuilder, ApplicationCommandOptionType, Application, PermissionsBitField } = require('discord.js');

module.exports = {
	name: "mute",
	aliases: ["timeout"],
	category: "moderation",
	usage: "mute <user> <durée> (durée en anglais et avec un espace entre chiffre et durée) [raison]",
    specialArgs: ["10 minutes (par exemple)"],
	permissions :[PermissionsBitField.Flags.ModerateMembers],
	description: "Mute une personne pour une duré spécifiée.",
	run: async (Izuna, message, args) => {
        const logChannel = Izuna.channels.cache.get("926874969399500804")

        // vérifications des arguments et de la mention
        const member = message.mentions.members.first()
        if (!member) return message.reply("Utilisateur non spécifié ou invalide.");
        if (!args[1] || !args[2]) return message.reply("Durée non spécifiée.");
        const duration = args.slice(1, 3).join(" ");
        const convertedTime = ms(duration);
        const reason = args.slice(3).join(" ") || "Aucune raison spécifiée.";
        if (!convertedTime) return message.reply("Durée non valide.");

        if (!member.moderatable) return message.reply("Utilisateur non mutable")
        member.timeout(convertedTime, reason);

        const logEmbed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Mute")
            .setThumbnail(member.displayAvatarURL())
            .addFields([
                { name: "Membre : ", value: member.user.tag, inline: false },
                { name: "Durée : ", value: duration, inline:false },
                { name: "Modérateur :", value: message.author.tag, inline:false },
            ])
            .setThumbnail()
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
            
        logChannel.send({ embeds: [logEmbed] });
	},
	options: [
		{
			name: "target",
			description: "Personne à bannir",
			type: ApplicationCommandOptionType.User,
			required: true
		},
		{
			name: "duration",
			description: "Durée du mute",
			type: ApplicationCommandOptionType.String,
			required: true
		},
        {
            name: "reason",
            description: "Raison du mute",
            type: ApplicationCommandOptionType.String,
            required: false
        }
	],
	runInteraction: async (Izuna, interaction) => {
        const logChannel = Izuna.channels.cache.get("926874969399500804")

        // vérifications des arguments et de la mention
        const user = interaction.options.getMember("target");
        const duration = interaction.options.getString("duration");
        const reason = interaction.options.getString("reason") || "Aucune raison spécifiée.";
        const convertedTime = ms(duration);

        if (!user) return interaction.reply("Utilisateur non spécifié ou invalide.");
        if (!duration || !convertedTime) return interaction.reply("Durée non spécifiée ou invalide.");

        if (!user.moderatable) return interaction.reply("Utilisateur non mutable")
        user.timeout(convertedTime, reason);

        const logEmbed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Mute")
            .setThumbnail(user.displayAvatarURL())
            .addFields([
                { name: "Membre : ", value: user.tag, inline: false },
                { name: "Raison : ", value: reason, inline:false },
                { name: "Durée : ", value: duration, inline:false },
                { name: "Modérateur :", value: message.author.tag, inline:false },
            ])
            .setThumbnail()
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
            
        logChannel.send({ embeds: [logEmbed] });
	}
}