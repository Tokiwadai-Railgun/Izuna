const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "reset",
    aliases: ["reset"],
    category: "Hazukumi",
    usage: "addxp <utilisateur> ",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.Administrator ],
    description: "reinitialise l'xp d'un membre",
    run: async (Izuna, message, args) => {
        if (args.lenght < 1) return message.channel.send("Merci de préciser un utilisateur et un montant d'xp à ajouter");
        if (!message.mentions || !message.mentions.users) return message.channel.send("Merci de préciser un utilisateur");


        let userDbInfo = await Izuna.findUserXp(message.mentions.users.first().id, message.guild.id);
        if (!userDbInfo) Izuna.createUserXp(message.mentions.users.first().id, message.guild.id);
        userDbInfo = await Izuna.findUserXp(message.mentions.users.first().id, message.guild.id);

        userDbInfo.userCoins = 0;
        userDbInfo.userXp = 0;
        userDbInfo.userLevel = 0;
            
        await Izuna.updateUserXp(message.mentions.users.first().id, userDbInfo, message.guild.id);

        message.channel.send("Le compte a été réinitialisé");
    },
    options: [
        { 
            name: "user", 
            type: ApplicationCommandOptionType.User,
            description: "L'utilisateur à qui ajouter de l'xp",
            required: true 
        },
    ],
    runInteraction: async (Izuna, interaction) => {
        const user = await interaction.options.getUser("user");


        let userDbInfo = await Izuna.findUserXp(user.id, interaction.guild.id);
        if (!userDbInfo) Izuna.createUserXp(user.id, interaction.guild.id);
        userDbInfo = await Izuna.findUserXp(user.id, interaction.guild.id);

        userDbInfo.userXp = 0;
        userDbInfo.userCoins = 0;
        userDbInfo.userLevel = 0;

        await Izuna.updateUserXp(user.id, userDbInfo, interaction.guild.id);

        interaction.reply("Le compte a été réinitialisé");
    }
}
