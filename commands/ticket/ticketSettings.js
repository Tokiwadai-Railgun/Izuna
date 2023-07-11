const { ActionRowBuilder, PermissionsBitField, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, Embed, ButtonStyle } = require('discord.js');
const guild = require('../../models/guild');




module.exports = {
    name: "ticketsettings",
    aliases: ["tsettings"],
    category: "ticket",
    usage: "ticketSettings <Status>",
    permissions :[PermissionsBitField.Flags.Administrator],
    description: "configuration de la fonction ticket",
    run: async (Izuna, message, args) => { 
        message.reply("Développement de la commande en cours")
    },
    options: [
      {
          name: "action",
          description: "Ce que vous voulez faire avec cette commande",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
              { name: "status", value:"status", description: "Définit le status de la fonction, on / off"},
              { name: "launchChannel", value: "launch-channel", description: "Le salon par lequel les membres pourront ouvrir un ticket" },
              { name: "ping", value: "ping", description: "Status du ping lors de l'ouverture d'un ticket (on/off)" },
              { name: "recrutement", value:"recrutement", description: "Activer ou désactiver les ticekts de recrutements." }
          ]
      }
    ],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        // récupérer la valeur de l'action
        const action = interaction.options.getString("action")

        // création d'un switch pour chaque type d'actions
        switch (action) {
            case "status" :
                const status = guildSettings.ticketStatus
                if (status === null) return interaction.reply("Erreur lors du lancement de la fonction, contactez 第三王権者 | レプリカ#1354 ou utilisez /report pour la signaler ")

                const statusEmbed = new EmbedBuilder()
                    .setTitle("Status de la fonction ticket")
                    .setDescription(status == "on" ? "La fonction est activée" : "La fonction est désactivée")

                // création d'un boutton d'activation
                const statusButton = new ButtonBuilder()
                    .setCustomId("ticket-status")
                    .setLabel(status == "on" ? "Désactiver la fonction" : "Activer la fonction")
                    .setStyle(status == "on" ? ButtonStyle.Danger : ButtonStyle.Success)

                const statusRow = new ActionRowBuilder()
                    .setComponents(statusButton)    

                interaction.reply({ embeds: [statusEmbed], components: [statusRow] })
                break;
            case "launch-channel" :
                // Afficher le salon de lancement actuel de la fonction et proposer de changer avec un boutton

                const actualLaunchChannel = guildSettings.ticketChannel
                const channelEmbed = new EmbedBuilder()
                    .setTitle("Salon de la fonction ticket")
                    .setDescription(`Le salon est actuellement : ${interaction.guild.channels.cache.get(actualLaunchChannel)}`)

                // création d'un boutton d'activation
                const channelButton = new ButtonBuilder()
                    .setCustomId("ticket-channel")
                    .setLabel("Changer le salon")
                    .setStyle(ButtonStyle.Danger)

                const channelRow = new ActionRowBuilder()
                    .setComponents(channelButton)    

                interaction.reply({ embeds: [channelEmbed], components: [channelRow] })


                break;
            case "ping" :
                interaction.reply("Développement en cours")
                // Afficher le status actuelle du ping lors de l'ouverture d'un ticket et proposer de changer avec un boutton
                break;

            
            case "recrutement" :
                // on envoie un message montrant le status et on demande si activer
            // Afficher le status actuelle du ping lors de l'ouverture d'un ticket et proposer de changer avec un boutton
            const recrutementStatus = guildSettings.recrutementStatus
            const recrutementEmbed = new EmbedBuilder()
                .setTitle("Fonction recrutement")
                .setDescription(recrutementStatus == "on" ? "Le recrutement est ouvert" : "Le recrutement est fermé")

            // création d'un boutton d'activation
            const recrutementButton = new ButtonBuilder()
                .setCustomId("recrutement-setup")
                .setLabel(recrutementStatus == "on" ? "Désactiver le recrutement" : "Activer le recrutement")
                .setStyle(recrutementStatus == "on" ? ButtonStyle.Danger : ButtonStyle.Success)

            const recrutementRow = new ActionRowBuilder()
                .setComponents(recrutementButton)    

            interaction.reply({ embeds: [recrutementEmbed], components: [recrutementRow] })
            break;

            default:
                interaction.reply("Erreur lors du lancement de la fonction, contactez 第三王権者 | レプリカ#1354 ou utilisez /report pour la signaler")
        }

    }
}