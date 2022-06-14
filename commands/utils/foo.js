const { MessageActionRow, MessageButton } = require('discord.js');

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('Dev rôle')
            .setStyle('PRIMARY')
            .setCustomId("random_role_add"),

        new MessageButton()
            .setLabel('Discord.js')
            .setURL("https://discord.js.org/#/docs/discord.js/main/general/welcomeg")
            .setStyle('LINK'),
        
        new MessageButton()
            .setLabel("Dangerous")
            .setStyle("DANGER")
            .setCustomId("danger-button"),
        
        new MessageButton()
            .setLabel("Success")
            .setStyle("SUCCESS")
            .setCustomId("succes-button")
        )


module.exports = {
    name: "foo",
    aliases: ["buttonTest"],
    category: "utils",
    usage: "foo",
    permissions :["VIEW_CHANNEL", "SEND_MESSAGES"],
    description: "test des button",
    run: async (Izuna, message, args) => { 
        message.channel.send({ content: "voici les bouttons", components: [buttons] });
    },
    runInteraction: async (Izuna, interaction) => {
        interaction.reply({ content: "voici les bouttons", components: [buttons] });
    }
}