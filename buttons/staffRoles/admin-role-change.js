const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, Embed } = require('discord.js');

const thirdEmbed = new EmbedBuilder()
    .setTitle("Mentionnez le nouveau rôle")
    .addFields([
        { name:"Conditions : ", value:"Pour pouvoir continuer cette action vous devez être propriétaire du serveur" }
    ])


    
    
module.exports = {
    name: "admin-role-change",
    permissions: [PermissionsBitField.Administrator],
    runInteraction: async (Izuna, interaction, guildSettings) => { 
        const ownerID = interaction.guild.ownerId
        if (interaction.user.id != ownerID) return interaction.reply("Permissions insuffisantes")

        interaction.reply("Actualisation")
        interaction.message.edit({ embeds: [thirdEmbed], components: [] })
        interaction.deleteReply()

        const filter = m => m.author.id === interaction.user.id;
        interaction.channel.awaitMessages({
            filter: filter,
            max: 1,
            time: 30000,
            errors: ["time"]
        }).then(msg => {
            if (!msg.first().mentions || !msg.first().mentions.roles) return interaction.message.edit({ content: "Commande annulée, aucun rôle mentionné", embeds: []})
            Izuna.staffRoleEdit(interaction.guild, { adminRole : msg.first().mentions.roles.first().id });

            const fourthEmbed = new EmbedBuilder()
                .setTitle("Modifications terminées")
                .addFields([{ name: "Nouveau Rôle :", value: `${msg.first().mentions.roles.first()}` }])
            interaction.message.edit({ embeds: [fourthEmbed], components:[] })

            msg.first().delete()
        })
        // on attend la réponse
        // on actualise
    }
   
}