const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits, StringSelectMenuBuilder, Embed } = require('discord.js');

    
module.exports = {
    name: "self-channel-channel-rename",
    permissions :[PermissionsBitField.Flags.SendMessages],
    runInteraction: async (Izuna, interaction) => {
        // création du salon
        const channel = interaction.channel

        const messageEmbed = new EmbedBuilder()
            .setTitle("Renommer le salon")
            .setDescription("Entrez le nouveau nom du salon")

        interaction.reply({ embeds: [messageEmbed]})

        const filter = m => m.author.id === interaction.user.id
        interaction.channel.awaitMessages({
                filter: filter,
                max: 1,
                time: 30000,
                errors: ["time"]
            }).then(msg => {
                channel.edit({name: msg.first().content})

                const succesEmbed = new EmbedBuilder()
                .setTitle("Nom du salon changé")
                .setDescription(`${interaction.user} a changé le nom du salon en \`\`${msg.first().content}\`\``)

                msg.first().delete()

                interaction.editReply({ embeds: [succesEmbed]})

            }).catch(err => /*interaction.channel.send("Temps écoulé, commande annulée.")*/ console.log(err))
    }
}