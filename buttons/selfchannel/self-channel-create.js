const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits, StringSelectMenuBuilder, UserSelectMenuBuilder } = require('discord.js');

    
module.exports = {
    name: "self-channel-create",
    permissions :[PermissionsBitField.Flags.SendMessages],
    runInteraction: async (Izuna, interaction) => {
        // création du salon
        const channel = await interaction.guild.channels.create({
            name: `${interaction.user.username}'s-channel`
        })

        channel.setParent(interaction.channel.parent)
        channel.permissionOverwrites.create(interaction.guild.roles.everyone, {"ViewChannel": false})
        channel.permissionOverwrites.create(interaction.user.id, {"ViewChannel": true})

        // Embeds
        const channelConfigurationEmbed = new EmbedBuilder()
            .setTitle(`Modifier le salon`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription("Modifier le salon pour le faire correspondre à vos besoins.")
            .setColor("#7F0856")
        

        const userSelectorEmbed = new EmbedBuilder()
            .setTitle("Ajouter des utilisateurs")
            .setDescription("Pour ajouter un utilisateur, sélectionnez le parmis les membres disponnibles dans la liste ci-dessous")
            .setColor("#7F0856")


        // ボタン
        const userSelector = new UserSelectMenuBuilder()
            .setCustomId("self-channel-user-add")
            .setPlaceholder("Sélectionner un utilisateur à ajouter")
            .setMinValues(1)
            .setMaxValues(10)

        const closingButton = new ButtonBuilder()
            .setLabel("Supprimer le salon")
            .setCustomId("ticket-close")
            .setStyle(ButtonStyle.Danger)

        const renameButton = new ButtonBuilder()
            .setLabel("Renommer le salon")
            .setCustomId("self-channel-channel-rename")
            .setStyle(ButtonStyle.Primary)

        const configurationButtonRow = new ActionRowBuilder()
            .setComponents(closingButton, renameButton)

        const userSelectorRow = new ActionRowBuilder()
            .setComponents([userSelector])

        
            

        // envoie des messages
        channel.send({ embeds: [channelConfigurationEmbed], components: [configurationButtonRow] })
        channel.send({ embeds: [userSelectorEmbed], components: [userSelectorRow]})
        await channel.send("@everyone").then(ping => ping.delete())
        interaction.reply({ content: `Salon ouvert : ${channel}`, ephemeral: true })
    }
}