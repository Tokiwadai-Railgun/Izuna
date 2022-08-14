const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	name: "lock",
	aliases: ["verouiller"],
	category: "moderation",
	usage: "lock",
	permissions :[PermissionsBitField.Flags.ManageChannels],
	description: "Vérouille un salon.",
	run: async (Izuna, message, args) => {
        const logChannel = message.channel;
        if (logChannel.type == "ThreadChannel") return message.reply("Cette commande ne fonctionne pas dans un fil de discussion.");

        message.channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: false})
        message.reply("Salon verrouillé.");
	},
	runInteraction: async (Izuna, interaction) => {
        
        const logChannel = interaction.channel;
        if (logChannel.type == "ThreadChannel") return interaction.reply("Cette commande ne fonctionne pas dans un fil de discussion.");

        interaction.channel.permissionOverwrites.edit(interaction.guild.id, {SEND_MESSAGES: false})
        interaction.reply("Salon verrouillé.");
	}
}