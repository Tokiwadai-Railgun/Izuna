const { ReactionUserManager, EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
module.exports = {
    name: "poll",
    aliases: ["vote", "sondage"],
    category: "utils",
    usage: "poll <question>",
    permissions: [ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.MentionEveryone ],
    description: "Création d'un sondage",
    run: async (Izuna, message, args) => {
        if (!args) return message.reply("Veuillez fournir une question pour votre sondage")
        const channelPing = message.mentions.channels.first() || message.channel;
        const pollTitle = "Sondage"
        const pollQuestion = args.slice(0).join(" ");

        if (!pollQuestion) return message.reply("Veuillez fournir une question pour votre sondage");

        const embed = new EmbedBuilder()
            .setTitle(pollTitle)
            .setDescription(pollQuestion)
            .setColor("#0099ff")
            .setTimestamp()
            .setFooter({ text: "Nouveau sondage généré par " + message.author.tag, iconURL: message.author.displayAvatarURL() });

        const poll = await channelPing.send({ embeds: [embed], fetchReply: true });
        await poll.react("✅");
        await poll.react("❌");
    },
    options : [
        {
            name: "title",
            description: "Le titre du sondage",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "question",
            description: "La question du sondage",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "channel",
            description: "Le channel dans lequel sera envoyé le sondage",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "choix1",
            description: "Le choix 1 du sondage (sous forme d'emoji)",
            type: ApplicationCommandOptionType.String,
            required: false,

        },
        {
            name: "choix2",
            description: "Le choix 2 du sondage (sous forme d'emoji)",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    runInteraction: async (Izuna, interaction) => {
        const pollTitle = interaction.options.getString("title");
        const pollQuestion = interaction.options.getString("question");
        const channel = interaction.options.getChannel("channel");
        const firstChoice = interaction.options.getString("choix1")?.trim() || "✅";
        const secondChoice = interaction.options.getString("choix2")?.trim() || "❌";

        let emoji = await interaction.guild.emojis.fetch()
            .then(emojis => {
                return emojis.find(emoji => emoji.name === firstChoice || emoji.toString() === firstChoice);
            }).catch(err => console.log(err));
            
        let emoji2 = await interaction.guild.emojis.fetch()
            .then(emojis => {
                return emojis.find(emoji => emoji.name === secondChoice || emoji.toString() === secondChoice);
            }).catch(err => console.log(err));
        if (!emoji || !emoji2) {
            emoji = "✅";
            emoji2 = "❌";
        }

        const embed = new EmbedBuilder()
            .setTitle(pollTitle)
            .setDescription(pollQuestion)
            .setColor("#0099ff")
            .setTimestamp()
            .setFooter({ text: "Nouveau sondage généré par " + interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

        const poll = await channel.send({ embeds: [embed], fetchReply: true });
        
        await poll.react(firstChoice);
        await poll.react(secondChoice);

        interaction.reply(`Sondage créé dans le salon ${channel}`);
    }
}