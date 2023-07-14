const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits } = require('discord.js');

    
module.exports = {
    name: "ticket-member-report",
    permissions :[PermissionsBitField.Flags.SendMessages],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        // check si fonction activée
        if (!guildSettings.ticketStatus === "on") return interaction.reply({ content: "La fonction est désactivée, contactez le staff pour plus de détail", ephemeral: true})
        // création d'un salon personnalisé et envoie d'un message pour création    

        // création du salon
        const channel = await interaction.guild.channels.create({
            name: `${interaction.user.username} staff report ticket`
        })

        channel.setParent(interaction.guild.channels.cache.get(guildSettings.ticketCategory))
        channel.permissionOverwrites.create(interaction.guild.roles.everyone, {"ViewChannel": false})
        channel.permissionOverwrites.create(interaction.user.id, {"ViewChannel": true})
        const moderatorRole = interaction.guild.roles.cache.get(guildSettings.moderatorRole)
        if (moderatorRole) {
            channel.permissionOverwrites.create(moderatorRole, {"ViewChannel": true})
        }


        // envoie d'un embed pour fermer 
        const ticketDetailEmbed = new EmbedBuilder()
            .setTitle(`Ticket de ${interaction.user.tag}`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription("L'utilisateur souhaite signaler un utilisateur")
        
        const closingButton = new ButtonBuilder()
            .setLabel("Fermer le ticket")
            .setCustomId("ticket-close")
            .setStyle(ButtonStyle.Danger)

        const closingButtonRow = new ActionRowBuilder()
            .setComponents(closingButton)

        channel.send({ embeds: [ticketDetailEmbed], components: [closingButtonRow] })
        await channel.send("@everyone").then(ping => ping.delete())
        interaction.reply({ content: `Ticket ouvert : ${channel}`, ephemeral: true })
    }
}