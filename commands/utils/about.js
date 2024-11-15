const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "about",
    aliases: ["apropos"],
    category: "utils",
    usage: "about",
    permissions :[PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    description: "Donne des informations inutiles sur le serveur.",
    run: async (Izuna, message, args) => {
        const info = new EmbedBuilder()
        .setTitle("Informations sur le serveur")
        .setColor('#f500ff')
        .addFields(
        { name: "Nom du  serveur : ", value: message.guild.name},
        { name: "Date de création : ", value: `${message.guild.createdAt}`},
        { name: "Nombre de membres : ", value: `${message.guild.memberCount}`},
        );

        message.channel.send({embeds:[info]});
    },
    runInteraction: async (Izuna, interaction) => {
        const tryPong = await interaction.reply({content: "On essaye de pong .... un instant !", fetchReply: true}); 

        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle("Pong !")
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields([
            { name: "Latence API", value: `\`\`\`\ ${Izuna.ws.ping}ms\`\`\``, inline: true },
            { name: "Latence BOT", value: `\`\`\`\ ${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true }
        ])
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.editReply({ embeds: [embed], content : " " });
    }
}