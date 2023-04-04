const { EmbedBuilder, ApplicationCommandOptionType,PermissionsBitField } = require('discord.js');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
	name: "clear",
	aliases: ["purge", "ratio", "clean"],
	category: "moderation",
	usage: "clear <amount> [target] (optionel)",
	permissions :[PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageMessages],
	description: "Supprime un certain nombre de messages, peut être complété avec une mention",
	run: async (Izuna, message, args, guildSettings) => {
		const userMention = message.mentions.members.first();
		const amount = parseInt(args[0]) + 1; // +1 pour le message de commande
		const logChannel = Izuna.channels.cache.get(guildSettings.logChannel)

		if(!amount || amount <= 2 || amount > 100) return logChannel.send("Veuillez indiquer un nombre de messages à supprimer entre 2 et 100");


		const logEmbed = new EmbedBuilder()
		if (logChannel) {
			logEmbed.setColor("#ff0000")
			logEmbed.setTitle("Suppression de messages")
			logEmbed.setDescription( userMention ? `${message.author} a supprimé ${amount - 1} messages de ${userMention}.` : `${message.author} a supprimé ${amount - 1} messages.`)
			logEmbed.addFields([{name: "Channel", value: message.channel.toString()}])
			logEmbed.setTimestamp()
			logEmbed.setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
		}

			
			
			
		const messages = await message.channel.messages.fetch();

		// commande 
		if(userMention) {
			let i = 0;
			const targetMessages = [];
			(await messages).filter(msg => {
				if (msg.author.id === userMention.id && parseInt(amount) > i) {
					targetMessages.push(msg); 
					i++; 
				} 
				
			});
			await message.channel.bulkDelete(targetMessages, true).then(msg => {logChannel.send({embeds: [logEmbed]})})

			
		} else {
			await message.channel.bulkDelete(amount, true).then(msg => {logChannel.send({ embeds: [logEmbed] })});
		}
	},
	options: [
		{
			name: "amount",
			description: "Nombre de messages à supprimer",
			type: ApplicationCommandOptionType.Number,
			required: true
		},
		{
			name: "target",
			description: "Mentionnez une personne pour ne supprimer que les messages de cette personne",
			type: ApplicationCommandOptionType.User,
			required: false
		}
	],
	runInteraction: async (Izuna, interaction, guildSettings) => {
		const amount = interaction.options.getNumber("amount");
		const target = interaction.options.getMember("target");

		const logChannel = Izuna.channels.cache.get(guildSettings.logChannel)
		if (amount < 2 || amount > 100) return interaction.reply("Veuillez indiquer un nombre de messages à supprimer entre 2 et 100");

		const fetched = await interaction.channel.messages.fetch({ limit: amount });

		if (target) {
			let i = 0;
			const targetMessages = [];
			(await targetMessages).filter(msg => {
				if (msg.author.id === target.id) targetMessages.push(msg); i++;
			});

			await interaction.channel.bulkDelete(targetMessages, true).then(msg => {const response = interaction.reply(`${msg.size} messages de ${target} ont été supprimés`)});
		
			await delay(1500)
			response.delete()
		} else {
			const messages = fetched;
			await interaction.channel.bulkDelete(messages, true).then(async msg => {
				const response = await interaction.reply( {content : msg.size > 1 ? `${msg.size} messages ont été supprimés` : `${msg.size} message a été supprimé`, fetchReply: true})
					.then(async response => {
						await delay(1000)
						.then(response.delete())

						if (!logChannel) return
						const logEmbed = new EmbedBuilder()
						.setColor("#ff0000")
						.setTitle("Suppression de messages")
						.setDescription( target ? `${interaction.user} a supprimé ${amount - 1} messages de ${userMention}.` : `${interaction.user} a supprimé ${amount - 1} messages.`)
						.addFields([{name: "Channel", value: interaction.channel.toString()}])
						.setTimestamp()
						.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

						logChannel.send({embeds: [logEmbed]})
					});
			});

		}

		
		
	}
}