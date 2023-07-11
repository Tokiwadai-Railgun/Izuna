const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, ChannelType, PermissionFlagsBits } = require('discord.js');
const guild = require('../../models/guild');

const responseEmbed = new EmbedBuilder()

    
module.exports = {
    name: "ticket-status",
    permissions :[PermissionsBitField.Flags.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        const status = guildSettings.ticketStatus

        switch (status) {
            case "off": 
                // on switch la fonction en ON  
                await Izuna.updateGuild(interaction.guild, {ticketStatus: "on"});

                // on envoie un embed de confirmation
                responseEmbed.setTitle("La fonction est désormais activée")
                responseEmbed.setColor("#29a721")
                interaction.reply({ embeds: [responseEmbed] })
                break;
            
            case "on": 
                await Izuna.updateGuild(interaction.guild, {ticketStatus: "off"});

                // on envoie un embed de confirmation
                responseEmbed.setTitle("La fonction est désormais désactivée")
                interaction.reply({ embeds: [responseEmbed] })
                

                // check si pas de catégorie si non alors création
                if (!guildSettings.ticketCategory) {
                    // création d'une catégory ticket

                    const category = await interaction.guild.channels.create({
                        name: "ticket",
                        type: ChannelType.GuildCategory,
                        permissionOverwrites: [{
                            id: interaction.guild.roles.everyone.id,
                            deny: [ PermissionFlagsBits.ViewChannel ]
                        }]
                    })

                    Izuna.updateGuild(interaction.guild, { "ticketCategory": category.id })
                }
                break;
            
            default:
                interaction.reply("Erreur lors du lancement de la fonction, contactez 第三王権者 | レプリカ#1354 ou utilisez /report pour la signaler ")
                break;
        }
    }
}