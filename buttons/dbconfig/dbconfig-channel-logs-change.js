const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');


module.exports = {
    name: "dbconfig-channel-logs-change",
    permissions: [PermissionsBitField.Flags.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        // Premeir embed 
        const thirdEmbed = new EmbedBuilder()
            .setTitle("Changement du salon d'archives")
            .setDescription("Mentionnez le salon")
            .setColor("#7F0856")
            
        
        interaction.reply("Actualisation")
        interaction.message.edit({embeds:[thirdEmbed], components:[]})
        interaction.deleteReply()

        const filter = m => m.author.id === interaction.user.id
        interaction.channel.awaitMessages({
            filter: filter,
            max: 1,
            time: 30000,
            errors: ["time"]
        }).then(msg => {
            if (!msg.first().mentions || !msg.first().mentions.channels) return interaction.message.edit({ content: "Commande annulée, aucun salon mentionné", embeds: []})
            Izuna.updateGuild(interaction.guild, { logChannel : msg.first().mentions.channels.first().id });

            const fourthEmbed = new EmbedBuilder()
                .setTitle("Modification terminée")
                .addFields([{ name: "Nouveau salon :", value: `${msg.first().mentions.channels.first()}` }])
                .setColor("#7F0856")
            interaction.message.edit({ embeds: [fourthEmbed], components:[] })

            msg.first().delete()
        })
    }
}