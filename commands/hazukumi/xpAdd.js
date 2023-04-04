const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "addxp",
    aliases: ["axp"],
    category: "Hazukumi",
    usage: "addxp <utilisateur> <montant>",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.Administrator ],
    description: "Ajoute de l'xp à un membre",
    run: async (Izuna, message, args) => {
        if (args.lenght < 2) return message.channel.send("Merci de préciser un utilisateur et un montant d'xp à ajouter");
        if (!message.mentions || !message.mentions.users) return message.channel.send("Merci de préciser un utilisateur");


        let userDbInfo = await Izuna.findUserXp(message.mentions.users.first().id, message.guild.id);
        if (!userDbInfo) Izuna.createUserXp(message.mentions.users.first().id, message.guild.id);
        userDbInfo = await Izuna.findUserXp(message.mentions.users.first().id, message.guild.id);

        userDbInfo.userXp += parseInt(args[1]);

        // boucle de level up

        let memberNeedeedXP = userDbInfo.userLevel * 60;
        while (userDbInfo.userXp > memberNeedeedXP) {
            userDbInfo.userLevel ++    
            userDbInfo.userXp -= memberNeedeedXP;
            
            memberNeedeedXP = userDbInfo.userLevel * 60;
        }

        await Izuna.updateUserXp(message.mentions.users.first().id, userDbInfo, message.guild.id);




        // création de l'embed
        const embed = new EmbedBuilder()
            .setTitle(`${message.mentions.users.first().username} a gagné ${args[1]} xp`)
            .setDescription(`${message.mentions.users.first().username} a maintenant ${userDbInfo.userXp} xp`)
            .setColor("#0099ff")
            .setThumbnail(message.mentions.users.first().displayAvatarURL())
            .addFields([
                { name: "Niveau actuel", value: `${userDbInfo.userLevel}`, inline: false },
                { name: "XP actuel", value: `${userDbInfo.userXp}`, inline: false },
                { name: "XP nécessaire pour level up", value: `${memberNeedeedXP}`, inline: false }
            ])
            .setTimestamp()


        message.channel.send({ embeds: [embed] });
    },
    options: [
        { 
            name: "user", 
            type: ApplicationCommandOptionType.User,
            description: "L'utilisateur à qui ajouter de l'xp",
            required: true 
        },
        { 
            name: "amount",
			description: "montant d'xp à ajouter",
			type: ApplicationCommandOptionType.Number,
			required: false
        }
    ],
    runInteraction: async (Izuna, interaction) => {
        const amount = interaction.options.getNumber("amount");
        const user = await interaction.options.getUser("user");


        let userDbInfo = await Izuna.findUserXp(user.id, interaction.guild.id);
        if (!userDbInfo) Izuna.createUserXp(user.id, interaction.guild.id);
        userDbInfo = await Izuna.findUserXp(user.id, interaction.guild.id);

        userDbInfo.userXp += parseInt(amount);

        // boucle de level up

        let memberNeedeedXP = userDbInfo.userLevel * 60;
        while (userDbInfo.userXp > memberNeedeedXP) {
            userDbInfo.userLevel ++    
            userDbInfo.userXp -= memberNeedeedXP;
            
            memberNeedeedXP = userDbInfo.userLevel * 60;
        }

        await Izuna.updateUserXp(user.id, userDbInfo, interaction.guild.id);




        // création de l'embed
        const embed = new EmbedBuilder()
            .setTitle(`${user.username} a gagné ${amount} xp`)
            .setDescription(`${user.username} a maintenant ${userDbInfo.userXp} xp`)
            .setColor("#0099ff")
            .setThumbnail(user.displayAvatarURL())
            .addFields([
                { name: "Niveau actuel", value: `${userDbInfo.userLevel}`, inline: false },
                { name: "XP actuel", value: `${userDbInfo.userXp}`, inline: false },
                { name: "XP nécessaire pour level up", value: `${memberNeedeedXP}`, inline: false }
            ])
            .setTimestamp()


        interaction.reply({ embeds: [embed] });
    }
}
