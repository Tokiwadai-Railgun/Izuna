const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');


module.exports = {
    name: "dbconfig-role-member-change",
    permissions: [PermissionsBitField.Flags.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => {
        const memberRoleID = guildSettings.memberRole
        const memberRole = interaction.guild.roles.cache.get(memberRoleID) ? interaction.guild.roles.cache.get(memberRoleID) : "Aucun"

        // Premeir embed 
        const thirdEmbed = new EmbedBuilder()
            .setTitle("Changement de rôle membre")
            .setDescription("Mentionnez le rôle membre")
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
            if (!msg.first().mentions || !msg.first().mentions.roles) return interaction.message.edit({ content: "Commande annulée, aucun rôle mentionné", embeds: []})
            Izuna.updateGuild(interaction.guild, { memberRole : msg.first().mentions.roles.first().id });

            const fourthEmbed = new EmbedBuilder()
                .setTitle("Modification terminée")
                .addFields([{ name: "Nouveau Rôle :", value: `${msg.first().mentions.roles.first()}` }])
                .setColor("#7F0856")
            interaction.message.edit({ embeds: [fourthEmbed], components:[] })

            msg.first().delete()
        })
    }
}