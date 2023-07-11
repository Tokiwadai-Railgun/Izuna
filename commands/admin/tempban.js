const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

const ms = require('ms');

module.exports = {
	name: "tempban",
	aliases: ["softban"],
	category: "moderation",
	usage: "tempban <user> <duration> [reason]",
	permissions :[PermissionsBitField.Flags.BanMembers],
    specialArgs: ["10 min (par exemple)"],
	description: "Bannis un membre, peut être compléter avec une raison.",
	run: async (Izuna, message, args) => {
        const logChannel = Izuna.channels.cache.get('926874969399500804');
        const member = message.mentions.members.first();
        const duration = args.slice(1, 3).join(" ");
        const convertedTime = ms(duration);
        const reason = args.slice(1).join(" ") || "Aucune raison spécifiée.";

        if (!args[1] || !args[2]) return message.reply("Durée non spécifiée.");
        if (!message.mentions.members.first() || message.guild.members.cache.get(args[0])) return message.channel.send("Utilisateur non spécifié ou invalide.")
        if (!member.bannable) return message.channel.send("Utilisateur non bannissable.");
        if (!convertedTime) return message.reply("Durée non valide.");


        const logEmbed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Bannissement")
            .setThumbnail(member.user.displayAvatarURL())
            .addFields([
                { name: "Membre : ", value: member.user.tag, inline: false },
                { name: "Raison : ", value: reason, inline:false },
                { name: "Moderateur :", value: message.author.tag, inline:false },
            ])            
            .setTimestamp()
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
        

        member.ban({ reason: reason, days: convertedTime });
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
            description: "Durée du bannissement",
            type: ApplicationCommandOptionType.Integer,
            required: true 
        },
		{
			name: "raison",
			description: "Raison du bannissement",
			type: ApplicationCommandOptionType.String,
			required: false
		}, 

	],
	runInteraction: async (Izuna, interaction) => {
        const target = interaction.options.getMember("target");
        const reason  = interaction.options.getString("raison") || "Aucune raison spécifiée.";
        const logChannel = Izuna.channels.cache.get('926874969399500804');
        const duration = interaction.options.getInteger("duration");

        if (!target.bannable) return interaction.reply("Utilisateur non bannissable.");
        if (!duration || duration < 1 || duration > 7) return interaction.reply("Durée non valide, elle doit être comprise entre 1 et 7 jours.");

        const logEmbed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Bannissement")
            .setThumbnail(target.user.displayAvatarURL())
            .addFields([
                { name: "Membre : ", value:  `\`\`\`${target.user.tag}\`\`\``, inline: false },
                { name: "Durée :", value : duration.toString(), inline:false },
                { name: "Raison : ", value: reason, inline:false },
                { name: "Moderateur :", value: interaction.user.tag, inline:false },
            ])            
            .setTimestamp()
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
            
        target.ban({ reason: reason, days: duration})
        logChannel.send({ embeds: [logEmbed] });
	}
}