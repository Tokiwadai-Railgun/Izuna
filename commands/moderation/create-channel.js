const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "selfchannel",
    aliases: ["autochannel", "channel"],
    category: "moderation",
    usage: "ping",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageChannels ],
    description: "Lance la configuration d'une fonction permettant aux membres de créer leurs propres salons !",
    run: async (Izuna, message, args) => {
        message.reply("Commande uniquement disponnible en /command")
    },
    options: [
        {
            name: "title",
            description: "Titre de l'embed",
			type: ApplicationCommandOptionType.String,
			required: true
        },
        {
            name: "description",
            description: "Description de l'Embed",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    runInteraction: async (Izuna, interaction) => {
        const channel = interaction.channel;
        var description = interaction.options.getString("description");
        var title = interaction.options.getString("title");

        // une fois que l'on a tout alors on lance la création d'un embed auquel on ajoute un boutton
        const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor("#7F0856")
        .setFooter({ iconURL: Izuna.user.avatarURL(), text:"Create channel."})

        // ボタン
        const channelButton = new ButtonBuilder()
        .setLabel("Créer un salon")
        .setCustomId("self-channel-create")
        .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder()
            .addComponents([channelButton])

        interaction.reply({ embeds: [embed], components: [row]})
    }
}