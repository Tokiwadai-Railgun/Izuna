const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	name: "unlock",
	aliases: ["deverouiller"],
	category: "moderation",
	usage: "unluck",
	permissions :[PermissionsBitField.Flags.ManageChannels],
	description: "Dévérouille un salon.",
	run: async (Izuna, message, args) => {
        const logChannel = message.channel;
        if (logChannel.type == "ThreadChannel") return message.reply("Cette commande ne fonctionne pas dans un fil de discussion.");

        message.channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: null})
        message.reply("Salon déverrouillé.");
	},
	runInteraction: async (Izuna, interaction) => {
        
        const logChannel = interaction.channel;
        if (logChannel.type == "ThreadChannel") return interaction.reply("Cette commande ne fonctionne pas dans un fil de discussion.");

        interaction.channel.permissionOverwrites.edit(interaction.guild.id, {SEND_MESSAGES: null})
        interaction.reply("Salon déverrouillé.");
	}
}