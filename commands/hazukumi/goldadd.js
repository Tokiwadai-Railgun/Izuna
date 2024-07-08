const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "addcoins",
    aliases: ["addcoins"],
    category: "Hazukumi",
    usage: "aaddcoins <utilisateur> <montant>",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.Administrator ],
    description: "Ajoute de la monnaie à un membre",
    run: async (Izuna, message, args) => {
        if (args.lenght < 2) return message.channel.send("Merci de préciser un utilisateur et un montant d'xp à ajouter");
        if (!message.mentions || !message.mentions.users) return message.channel.send("Merci de préciser un utilisateur");


        let userDbInfo = await Izuna.findUserXp(message.mentions.users.first().id, message.guild.id);
        if (!userDbInfo) Izuna.createUserXp(message.mentions.users.first().id, message.guild.id);
        userDbInfo = await Izuna.findUserXp(message.mentions.users.first().id, message.guild.id);

        userDbInfo.userCoins += parseInt(args[1]);

        await Izuna.updateUserXp(message.mentions.users.first().id, userDbInfo, message.guild.id);


        // création de l'embed
        const embed = new EmbedBuilder()
            .setTitle(`${message.mentions.users.first().username} a gagné ${args[1]} xp`)
            .setColor("#0099ff")
            .setThumbnail(message.mentions.users.first().displayAvatarURL())
            .addFields([
                { name: "Niveau actuel", value: `${userDbInfo.userCoins}`, inline: false },
            ])
            .setTimestamp()


        message.channel.send({ embeds: [embed] });
    },
    options: [
        { name: "user", type: ApplicationCommandOptionType.User, description: "L'utilisateur à qui ajouter de l'xp", required: true },
        { name: "amount", type: ApplicationCommandOptionType.Number, description: "Le montant d'xp à ajouter", required: true }
    ],
    runInteraction: async (Izuna, interaction) => {
        const amount = interaction.options.getNumber("amount");
        const user = await interaction.options.getUser("user");

        let userDbInfo = await Izuna.findUserXp(user.id, interaction.guild.id);
        if (!userDbInfo) Izuna.createUserXp(user.id, interaction.guild.id);
        userDbInfo = await Izuna.findUserXp(user.id, interaction.guild.id);

        userDbInfo.userCoins += parseInt(amount);

        await Izuna.updateUserXp(user.id, userDbInfo, interaction.guild.id);




        // création de l'embed
        const embed = new EmbedBuilder()
            .setTitle(`${user.username} a gagné ${amount} de monnaie`)
            .setColor("#0099ff")
            .setThumbnail(user.displayAvatarURL())
            .addFields([
                { name: "Monnaie actuel", value: `${userDbInfo.userCoins}`, inline: false },

            ])
            .setTimestamp()


        interaction.reply({ embeds: [embed] });
    }
}
