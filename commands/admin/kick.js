const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');


module.exports = {
	name: "kick",
	aliases: ["kick"],
	category: "moderation",
	usage: "kick <user> [reason]",
	permissions :[PermissionsBitField.Flags.KickMembers],
	description: "Expulse un membre, peut être compléter avec une raison.",
	run: async (Izuna, message, args) => {
        const logChannel = Izuna.channels.cache.get('926874969399500804');

        if (!message.mentions.members.first() || message.guild.members.cache.get(args[0])) return message.channel.send("Utilisateur non spécifié ou invalide.")
        const user = message.mentions.members.first();
        if (!user.kickable) return message.channel.send("Utilisateur non expulsable.");

        const reason = args.slice(1).join(" ") || "Aucune raison spécifiée.";

        const logEmbed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Expulsion")
            .setThumbnail(user.user.displayAvatarURL())
            .addFields([
                { name: "Membre : ", value: user.user.tag, inline: false },
                { name: "Raison : ", value: reason, inline:false },
                { name: "Moderateur :", value: message.author.tag, inline:false },
            ])            
            .setTimestamp()
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
        

        user.kick(reason)
        logChannel.send({ embeds: [logEmbed] });
	},
	options: [
		{
			name: "target",
			description: "Personne à expulser",
			type: ApplicationCommandOptionType.User,
			required: true
		},
		{
			name: "raison",
			description: "Raison de l'expulsion",
			type: ApplicationCommandOptionType.String,
			required: false
		}
	],
	runInteraction: async (Izuna, interaction) => {
        const target = interaction.options.getMember("target");
        const reason  = interaction.options.getString("raison") || "Aucune raison spécifiée.";
        const logChannel = Izuna.channels.cache.get('926874969399500804');

        if (!target.kickable) return interaction.reply("Utilisateur non expulsable.");
       
        const logEmbed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Expulsion")
            .setThumbnail(target.user.displayAvatarURL())
            .addFields([
                { name: "Membre", value:  `\`\`\`${target.user.tag}\`\`\``, inline: false },
                { name: "Raison : ", value: reason, inline:false },
                { name: "Moderateur :", value: interaction.user.tag, inline:false },
            ])            
            .setTimestamp()
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
            
        target.kick(reason)
        logChannel.send({ embeds: [logEmbed] });
	}
}