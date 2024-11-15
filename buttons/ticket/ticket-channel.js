const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, Embed, ActionRow } = require('discord.js');

const channelEmbed = new EmbedBuilder()
    .setTitle("Veuillez ping le nouveau salon")

    
module.exports = {
    name: "ticket-channel",
    permissions :[PermissionsBitField.Flags.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        // demander de ping le nouveau salon
        interaction.reply({ embeds: [channelEmbed] });
        
        const filter = m => m.author.id === interaction.user.id;
        interaction.channel.awaitMessages({
            filter: filter,
            max: 1,
            time: 30000,
            errors: ["time"]
        })
        .then(msg => {
            // check si le message contient un mention de salon. 
            if (!msg.first().mentions.channels) return interaction.channel.send("Aucun salon reconnus, veuillez relancer la démarche")
            const channel = msg.first().mentions.channels.first()
            // changer si c'est le cas
            Izuna.updateGuild(interaction.guild, {"ticketChannel": channel.id})

            //envoyer message de confirmation 

            const confirmationEmbed = new EmbedBuilder()
                .setTitle("Changement effectué")
                .setDescription(`Le nouveau salon est : ${channel}`)
                .setColor("#29a721")

            interaction.channel.send({ embeds: [confirmationEmbed] })




            // envoie d'un message dans le dit salon pour préparer le ticket
            const ticketEmbed = new EmbedBuilder()
                .setTitle("Ouvrir un ticket")
                .setDescription("Pour ouvrir un ticket cliquez sur le boutton correspondant à votre demande.")
            
            const helpTicketButton = new ButtonBuilder()
                .setLabel("Aide quelconque")
                .setCustomId("ticket-help")
                .setStyle(ButtonStyle.Success)
            
            const reportTicketButton = new ButtonBuilder()
                .setLabel("Signalement d'un membre")
                .setCustomId("ticket-member-report")
                .setStyle(ButtonStyle.Danger)

            const staffReportTicketButton = new ButtonBuilder()
                .setLabel("Signalement d'un membre du staff")
                .setCustomId("ticket-staff-report")
                .setStyle(ButtonStyle.Danger)

            const ticketRow = new ActionRowBuilder()
                .setComponents([ helpTicketButton, reportTicketButton, staffReportTicketButton ])


            // on envoie le message dans le salon.
            channel.send({embeds: [ticketEmbed], components: [ticketRow]})
        })
    }
}