const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
	name: "thread",
	aliases: ["th"],
	category: "thread",
	usage: "thread <sous commande> [salon (si requis)]",
    specialAgs: ["Join", "Leave", "archive", "unarchive", "delete (nessessite de mentionner un salon)"],
	permissions :[PermissionsBitField.Flags.ManageThreads],
	description: "Modération des threads",
	run: async (Izuna, message, args) => {
        if (!args[0]) return message.channel.send("Veuillez spécifier une action.");
        if (!args[0].match(/^(join|leave|archive|unarchive|delete)$/)) return message.channel.send("Action indiquée invalide.");
        let thread = message.channel;
        if ((thread.type != "GUILD_PUBLIC_THREAD") && (thread.type != GUILD_PRIVATE_THREAD)) return message.reply({ content: "Cete commande ne peut être lancée que dans un tread", ephemeral: true });

        if (args[0] == "Join") {
            if (thread.joinable) await thread.join();
            message.reply("Thread rejoint");
        } else if (args[0] == "Leave") {
            await thread.leave();
        } else if (args[0] == "archive") {
            await message.reply("Thread archivé");
            await thread.setArchive(true);
        } else if (args[0] == "unarchive") {
            await thread.setArchive(false);
            await message.reply("Thread désarchivé");
        } else if (args[0] == "delete") {
            await message.reply("Suppression du thread");
            const logchannel = message.mentions.channels.first()
            if (!logchannel) return message.reply("Veuillez mentionner un channel pour les logs");
            await logchannel.send({ embeds: [new EmbedBuilder()
                .setTitle("Suppression d'un thread")
                .setDescription(`Le thread ${thread.name} a été supprimé`)
                .addFields([{name: "Modérateur : ", value: message.author.tag}])
                .setColor("#ff0000")
                .setTimestamp()]});
            await thread.delete();
        }
	},
	options: [
		{
			name: "join",
			description: "Rejoindre un thread",
			type: ApplicationCommandOptionType.Subcommand,
		},
        {
			name: "leave",
			description: "Quitter un thread",
			type: ApplicationCommandOptionType.Subcommand,
		},
        {
			name: "archive",
			description: "Archiver un thread",
			type: ApplicationCommandOptionType.Subcommand,
		},
        {
			name: "unarchive",
			description: "Désarchiver un thread",
			type: ApplicationCommandOptionType.Subcommand,
		},
        {
			name: "delete",
			description: "Supprimer un thread",
			type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "channel", type: ApplicationCommandOptionType.Channel, required: true, description: "Salon de log" },
            
            ]
		}
	],
	runInteraction: async (Izuna, interaction) => {
        let thread = interaction.channel;
        if ((thread.type != "GUILD_PUBLIC_THREAD") && (thread.type != "GUILD_PRIVATE_THREAD")) return interaction.reply({ content: "Cete commande ne peut être lancée que dans un tread", ephemeral: true });

        if (interaction.options.getSubcommand() == "join") {
            if (thread.joinable) await thread.join();
            interaction.reply("Thread rejoint");
        } else if (interaction.options.getSubcommand() == "leave") {
            await thread.leave();
        } else if (interaction.options.getSubcommand() == "archive") {
            await interaction.reply("Thread archivé");
            await thread.setArchived(true);
        } else if (interaction.options.getSubcommand() == "unarchive") {
            await thread.setArchived(false);
            await interaction.reply("Thread désarchivé");
        } else if (interaction.options.getSubcommand() == "delete") {
            await interaction.reply("Suppression du thread");
            const logchannel = interaction.options.getChannel("channel");
            await logchannel.send({ embeds: [new EmbedBuilder()
                .setTitle("Suppression d'un thread")
                .setDescription(`Le thread ${thread.name} a été supprimé`)
                .addFields([{name: "Modérateur : ", value: interaction.user.tag}])
                .setColor("#ff0000")
                .setTimestamp()]});
            await thread.delete();
        } else {
            interaction.reply("Commande inconnue");
        }
    }

}