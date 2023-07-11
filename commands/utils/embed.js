const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "embed",
    aliases: ["embed"],
    category: "utils",
    usage: "embed",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages ],
    description: "Permet d'envoyer un embed",
    run: async (Izuna, message, args) => {
        return message.reply("Commande disponnible uniquement via les /commands")
    },
    runInteraction: async (Izuna, interaction) => {
        // demander le titre    
        const titleEmbed = new EmbedBuilder()
            .setTitle("Entrez un titre")
            .setDescription("Ce qui sera affiché comme juste au dessus")
        interaction.reply({ embeds: [titleEmbed] })

        const filter = m => m.author.id === interaction.user.id;
        interaction.channel.awaitMessages({
            filter: filter,
            max: 1,
            time: 30000,
            errors: ["time"]
        })
        .then(msg => {
            const title = msg.first().content

            // demander la description
            const descriptionEbmed = new EmbedBuilder()
                .setTitle("Entrez le message")
                .setDescription("Ce qui sera affiché comme ici")
            interaction.reply({ embeds: [descriptionEbmed] })

            interaction.channel.send({ embeds: [descriptionEbmed] })

            const filter = m => m.author.id === interaction.user.id;
            interaction.channel.awaitMessages({
                filter: filter,
                max: 1,
                time: 30000,
                errors: ["time"]
            })
            .then(async rep => {
                const description = rep.first().content 

                // création de boutton pour ajouter des champs
                const fieldsButton = new ButtonBuilder()
                    .setCustomId("embed-field-add")
                    .setLabel("Ajouter un champ")
                    .setStyle(ButtonStyle.Success)
                
                const fieldsRow = new ActionRowBuilder()
                    .setComponents(fieldsButton)

                const fieldsEmbed = new EmbedBuilder()
                    .setTitle("Ajouter un champ ? ")
                    .addFields({name: "Exemple de champ", value: "Voici la description du champ"})
                // création de l'embed finale (auquel on ajoutera des bouttons)
                const embed = new EmbedBuilder()
                    .setTitle(title)
                    .setDescription(description)
                    .setColor("#BE4B53")
                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                
                await interaction.channel.bulkDelete(4, true)    
                interaction.channel.send({ embeds: [embed] })
                interaction.channel.send({ embeds: [fieldsEmbed], components: [fieldsRow] })
            })
        })
        
    }
}