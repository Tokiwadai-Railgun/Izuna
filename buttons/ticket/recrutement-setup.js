const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, ChannelType, PermissionFlagsBits, Embed, channelLink } = require('discord.js');
const guild = require('../../models/guild');

const responseEmbed = new EmbedBuilder()

    
module.exports = {
    name: "recrutement-setup",
    permissions :[PermissionsBitField.Flags.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        // on regarde si fx activée ou non
        switch (guildSettings.recrutementStatus) {
            case "off" : 
                // on active 
                Izuna.updateGuild(interaction.guild, { recrutementStatus : "on" });
                
                // on demande le salon
                const channelEmbed = new EmbedBuilder()
                    .setTitle("Définissez le salon")
                    .setDescription("Pingez le salon dans lequel le message présentant l'ouverture des recrutements va être envoyé")

                interaction.reply({ embeds: [channelEmbed] })
                
                const filter = m => m.author.id === interaction.user.id;
                interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                })
                .then(msg => {
                    if (!msg.first().mentions.channels) return interaction.channel.send("Commande annulé, salon non reconnus")
                    const channel = msg.first().mentions.channels.first()
                    const descriptionEmbed = new EmbedBuilder()
                        .setTitle("Définissez la description des postes ouverts")
                        .setDescription("Indiquez les postes ouverts et les prérequis pour les candidats.")

                    // on enregistre dans la bdd
                    Izuna.updateGuild(interaction.guild, { recrutementChannel: channel.id })
                    interaction.channel.send({ embeds: [descriptionEmbed] })
                    interaction.channel.awaitMessages({
                        filter: filter,
                        max: 1,
                        time: 30000,
                        errors: ["time"]
                    })
                    .then(rep => {
                        const candidaturesEmbed = new EmbedBuilder()
                            .setTitle("Candidatures Ouvertes")
                            .setDescription(rep.first().content)
                        
                        const candidateButton = new ButtonBuilder()
                            .setLabel("Candidater")
                            .setCustomId("ticket-recrutement")
                            .setStyle(ButtonStyle.Success)
                        
                        const candidateRow = new ActionRowBuilder()
                            .setComponents(candidateButton)
                        
                        channel.send({ embeds: [candidaturesEmbed], components: [candidateRow] })
                    })
                })
                // on envoie le message

                break;

            case "on" :
                const closeEmbed = new EmbedBuilder()
                    .setTitle("Recrutement Fermés")
                await Izuna.updateGuild(interaction.guild, { recrutementStatus : "off" }) 
                interaction.reply({ embeds: [closeEmbed] })
                break;
        }

        // si non on demande le salon de recrutement et on envoie message
        // on créé catégorie si besoin.
    }
}