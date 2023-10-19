const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits, StringSelectMenuBuilder, Embed } = require('discord.js');

module.exports = {
    name: "self-channel-user-add",
    permissions :[PermissionsBitField.Flags.SendMessages],
    runInteraction: async (Izuna, interaction) => {
        console.log("trigger")
        const users = interaction.users
        let usersArray = [];
        const channel = interaction.channel

        console.log(users)

        for (let user of users) {
            console.log(user[1].id)
            channel.permissionOverwrites.create(user[1].id, {"ViewChannel": true})
            usersArray.push(user[1])
        }

        const responseMessage = Array.length > 1 ? `Les utilisateurs ${usersArray} ont étés ajoutés au salon` : `L'utilisateur ${usersArray} a été ajouté au salon`
        interaction.reply(responseMessage)
    }  
}