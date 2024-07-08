const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

const titleEmbed = new EmbedBuilder()
    .setTitle("Entrez le titre de la règle")

const descriptionEmbed = new EmbedBuilder()
    .setTitle("Entrez la description de la règle")

const newRuleButton = new ButtonBuilder()
    .setCustomId("new-rule")
    .setLabel("Nouvelle règle")
    .setStyle(ButtonStyle.Success)
    
const row = new ActionRowBuilder()
    .setComponents(newRuleButton)

    
module.exports = {
    name: "new-rule",
    permissions: PermissionsBitField.Administrator,
    runInteraction: async (Izuna, interaction, guildSettings) => {
        // Envoie un embed demandant le titre de la règle
        interaction.reply({ embeds: [titleEmbed], })

        const filter = m => m.author.id === interaction.user.id;
        interaction.channel.awaitMessages({
            filter: filter,
            max: 1,
            time: 30000,
            errors: ["time"]
        })
        .then(collected => {
            // envoie du message à propos de la description de la règle
            interaction.channel.send({ embeds: [descriptionEmbed] })
            interaction.channel.awaitMessages({
                filter: filter,
                max: 1,
                time: 30000,
                errors: ["time"]
            })
            .then(response => {
                // on met à jours le message des règles
                interaction.channel.messages.fetch(guildSettings.rulesMessage)
                .then(msg => {
                    if (msg == null) return interaction.channel.send("Message non trouvé, vérifiez bien que vous faite cette commande dans le salon des règles")
    
                    const newRule = new EmbedBuilder()
                        .setTitle(`${msg.embeds[0].title}`)

                    for (let i of msg.embeds[0].fields) {
                        newRule.addFields({ name: i.name, value: i.value })
                    }
                        
                    newRule.addFields([ { name: collected.first().content, value: response.first().content } ])
                    
                    

                    console.log(newRule)
                    msg.edit({ embeds: [newRule] })

                    interaction.channel.bulkDelete(4, true)
                })

            }) 

        })
    }
}