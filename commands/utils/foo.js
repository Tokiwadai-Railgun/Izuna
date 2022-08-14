const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setLabel('Dev rôle')
            .setStyle( ButtonStyle.Primary )
            .setCustomId("random_role_add"),

        new ButtonBuilder()
            .setLabel('Discord.js')
            .setURL("https://discord.js.org/#/docs/discord.js/main/general/welcomeg")
            .setStyle( ButtonStyle.Link ),
        
        new ButtonBuilder()
            .setLabel("Dangerous")
            .setStyle( ButtonStyle.Danger )
            .setCustomId("danger-button"),
        
        new ButtonBuilder()
            .setLabel("Success")
            .setStyle( ButtonStyle.Success )
            .setCustomId("succes-button")
        )


module.exports = {
    name: "foo",
    aliases: ["buttonTest"],
    category: "utils",
    usage: "foo",
    permissions :[PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    description: "test des button",
    run: async (Izuna, message, args) => { 
        message.channel.send({ content: "voici les bouttons", components: [buttons] });
    },
    runInteraction: async (Izuna, interaction) => {
        interaction.reply({ content: "voici les bouttons", components: [buttons] });
    }
}