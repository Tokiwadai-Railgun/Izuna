const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "verify",
    aliases: ["verify"],
    category: "Hazukumi",
    usage: "verify",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages ],
    description: "Pong !",
    run: async (Izuna, message, args) => {
        // donner un rôle membre aux personnes qui la donnnent 

        // verifier serveur d'envoie
        if(message.guild.id !== "732692494621605909") return message.channel.send("Cette commande n'est pas disponnible sur ce serveur ! ");

        // vérifier si déjà rôle membre
        if (message.member.roles.cache.get("732868683679924344")) return message.channel.send("Tu as déjà le rôle membre");

        // si non -> donner rôle membre
        message.member.roles.add("732868683679924344")
        return message.author.send("Bienvenue sur Hazukumi")
    },
    runInteraction: async (Izuna, interaction) => {
        if (interaction.guild.id !== "732692494621605909") return interaction.reply({ content : "Cette commande est indisponnible sur ce serveur", ephemeral: true});
        if (message.member.roles.cache.get("732868683679924344")) return interaction.reply({content: "Tu as déjà le rôle membre", ephemeral: true});

        interaction.member.roles.add("732868683679924344")
        return interaction.reply("Bienvenue sur Hazukumi")

    }
}