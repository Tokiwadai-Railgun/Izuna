const ms = require('ms');
const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');


module.exports = {
	name: "unmute",
	aliases: ["unmute"],
	category: "moderation",
	usage: "unmute <user> [reason]",
    specialArgs: ["10 minutes (par exemple)"],
	permissions :[PermissionsBitField.Flags.MuteMembers],
	description: "Mute une personne pour une duré spécifiée.",
	run: async (Izuna, message, args) => {
        const logChannel = Izuna.channels.cache.get("926874969399500804")

        // vérifications des arguments et de la mention
        const member = message.mentions.members.first()
        if (!member) return message.reply("Utilisateur non spécifié ou invalide.");
        const reason = args.slice(1).join(" ") || "Aucune raison spécifiée.";

        if (!member.isCommunicationDisabled()) return message.reply("L'utilisateur mentionné n'est pas mute.");
        member.timeout(null, reason);

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
            name: "reason",
            description: "Raison du mute",
            type: ApplicationCommandOptionType.String,
            required: false
        }
	],
	runInteraction: async (Izuna, interaction) => {
        const logChannel = Izuna.channels.cache.get("926874969399500804")

        // vérifications des arguments et de la mention
        const user = interaction.options.getMember(target);
        const reason = interaction.options.getString(reason) || "Aucune raison spécifiée.";

        if (!user) return interaction.reply("Utilisateur non spécifié ou invalide.");
        if (!args[1] || !args[2]) return interaction.reply("Durée non spécifiée.");
        if (!duration || !convertedTime) return interaction.reply("Durée non spécifiée ou invalide.");

        if (!user.moderatable) return interaction.reply("Utilisateur non mutable")
        user.timeout(null, reason);

        const logEmbed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Unmute")
            .setThumbnail(user.displayAvatarURL())
            .addFields([
                { name: "Membre : ", value: user.tag, inline: false },
                { name: "Raison : ", value: reason, inline:false },
                { name: "Modérateur :", value: message.author.tag, inline:false },
            ])
            .setThumbnail()
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
            
        logChannel.send({ embeds: [logEmbed] });
	}
}