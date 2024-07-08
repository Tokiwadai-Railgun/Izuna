const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "ping",
    aliases: ["latency", "latence"],
    category: "utils",
    usage: "ping",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages ],
    description: "Pong !",
    run: async (Izuna, message, args) => {
        const tryPong = await message.channel.send({ content: "On essaye de pong .... un instant ! ", fetchReply: true});

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle("Pong !")
            .setThumbnail(message.author.displayAvatarURL())
            .addFields([
                { name: "Latence API", value: `\`\`\`\ ${Izuna.ws.ping}ms\`\`\``, inline: true },
                { name: "Latence BOT", value: `\`\`\`\ ${tryPong.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true }

            ])
            .setTimestamp()
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });

        tryPong.edit({ embeds: [embed], content: " "});
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