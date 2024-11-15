const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "report",
    aliases: ["bug"],
    category: "utils",
    usage: "report",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages ],
    description: "Pong !",
    run: async (Izuna, message, args) => {
        const answer = await message.reply("Quel est le problème")

        message.channel.awaitMessages({ 
            filter: m => m.author.id == message.author.id,
            max: 1, 
            time: 10000, 
            errors: ["time"] 
        }).then(rep => {
            const owner = Izuna.users.cache.get("330026848052314112");
            owner.send(`Message report de ${message.author} venant du serveur ${message.guild} : \n${rep.first().content}`)

            answer.edit("Le problème a été signalé, merci pour votre aide.")
            rep.first().delete()
        }).catch(err => {
            console.log(err)
            message.channel.send("Temps de réponse écoulé, veuillez réssayer, si ceci est due à une erreur contactez <@330026848052314112> en message privé")
        })


    },
    runInteraction: async (Izuna, interaction) => {
        const answer = await interaction.reply("Quel est le problème")

        interaction.channel.awaitMessages({ 
            filter: m => m.author.id == interaction.user.id,
            max: 1, 
            time: 10000, 
            errors: ["time"] 
        }).then(rep => {
            const owner = Izuna.users.cache.get("330026848052314112");
            owner.send(`Message report de ${interaction.user} venant du serveur ${interaction.guild} : \n${rep.first().content}`)

            interaction.editReply("Le problème a été signalé, merci pour votre aide.")
            rep.first().delete()
        }).catch(err => {
            console.log(err)
            interaction.channel.send("Temps de réponse écoulé, veuillez réssayer, si ceci est due à une erreur contactez <@330026848052314112> en message privé")
        })
    }
}