const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "secondary-button",
    permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    runInteraction: async (Izuna, interaction) => {
        const tryPong = await interaction.reply({content: "On essaye de pong .... un instant !", fetchReply: true}); 

        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle("Secondary !")
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