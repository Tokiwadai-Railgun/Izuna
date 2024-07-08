const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "getname",
    aliases: ["whois"],
    category: "utils",
    usage: "getname <ID>",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages ],
    description: "Donne des informations sur un membre à partir d'un ID",
    run: async (Izuna, message, args) => {
        if (!args[0]) return message.channel.send('Merci de préciser un ID');

        const user = await Izuna.users.fetch(args[0]);
        if (!user) return message.channel.send('Cet ID n\'existe pas');

        const embed = new EmbedBuilder()
            .setTitle(`Informations sur ${user.tag}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields([
                { name: "Nom d'utilisateur :", value: `${user.username} (${user.id})` },
                { name: "Date de création du compte", value: `<t:${parseInt(user.createdTimestamp / 1000)}:f>` },
                { name: "Bot?", value: user.bot? "Oui" : "Non" },
                { name: "Serveur", value: message.guild.members.cache.get(user.id).guild.name? `L'utilisateur est dans le serveur (${user})` : "L'utilisateur n'est pas dans ce serveur" },
                ])



        const pingedMember = message.guild.members.cache.get(args[0])
        if (message.guild.members.cache.get(user.id)) {
            embed.addFields([ 
                { name: "Status : ", value: `${pingedMember.roles.highest}` },
                { name: "Rejoint le : ", value: `<t:${parseInt(message.member.joinedTimestamp / 1000)}:f>` }
            ])
        }

        message.channel.send({ embeds: [embed] });
        },
        options: [
            {
                name: "user",
                description: "l'ID de l'utilisateur",
                type: ApplicationCommandOptionType.String,
                required: true

            }
        ],
    runInteraction: async (Izuna, interaction) => {
        const userID = interaction.options.getString("user")

        const user = await Izuna.users.fetch(userID);
        if (!user) return interaction.r('Cet ID n\'existe pas');

        const embed = new EmbedBuilder()
            .setTitle(`Informations sur ${user.tag}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields([
                { name: "Nom d'utilisateur :", value: `${user.username} (${user.id})` },
                { name: "Date de création du compte", value: `<t:${parseInt(user.createdTimestamp / 1000)}:f>` },
                { name: "Bot?", value: user.bot? "Oui" : "Non" },
                { name: "Serveur", value: interaction.guild.members.cache.get(user.id).guild.name? `L'utilisateur est dans le serveur (${user})` : "L'utilisateur n'est pas dans ce serveur" },
                ])

        interaction.reply({ embeds: [embed] })
        
    }
}