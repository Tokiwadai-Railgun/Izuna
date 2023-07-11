const { EmbedBuilder, PermissionsBitField, EmbedAssertions } = require('discord.js');
const { description } = require('../../commands/utils/embed');

module.exports = {
    name: "embed-field-add",
    permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    runInteraction: async (Izuna, interaction) => {
        // demander ID du message
        const idEmbed = new EmbedBuilder()
            .setTitle("Veuillez fournir l'ID du message")
        interaction.reply({ embeds: [idEmbed] })

        const filter = m => m.author.id === interaction.user.id;
        interaction.channel.awaitMessages({
            filter: filter,
            max: 1,
            time: 30000,
            errors: ["time"]
        })
        .then(async idMessage => {
            const id = idMessage.first().content

            if (!interaction.channel.messages.fetch(id)) return interaction.channel.send("Erreur, message non trouvé")
            const message = await interaction.channel.messages.fetch(id)
            if (!message.embeds) return interaction.channel.send("Aucun embed dans le message")

            const titleEmbed = new EmbedBuilder()
                .setTitle("Entrez le titre du champ")
            // récupération des 

            interaction.channel.send({ embeds: [titleEmbed] })
            interaction.channel.awaitMessages({
                filter: filter,
                max: 1,
                time: 30000,
                errors: ["time"]
            })
            .then(rep => {
                const fieldTitle = rep.first().content

                const descriptionEmbed = new EmbedBuilder()
                    .setTitle("Entrez la description de l'Embed")
                interaction.channel.send({ embeds: [descriptionEmbed] })
                interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                })
                .then(descriptionMessage => {
                    const fieldDescription = descriptionMessage.first().content
                    
                    const newEmbed = new EmbedBuilder()
                        .setTitle(`${message.embeds[0].title}`)
                        .setDescription(message.embeds[0].description)
                        .setColor(message.embeds[0].color)
                        .setFooter(message.embeds[0].footer)

                    for (let i of message.embeds[0].fields) {
                        newEmbed.addFields({ name: i.name, value: i.value })
                    }
                        
                    newEmbed.addFields([ { name: fieldTitle, value: fieldDescription } ])
                    
                    

                    console.log(newEmbed)
                    message.edit({ embeds: [newEmbed] })

                    interaction.channel.bulkDelete(6, true)
                })
            })

        }) 
    }
}