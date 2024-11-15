const { ReactionUserManager, InteractionWebhook, EmbedBuilder, PermissionsBitField } = require("discord.js");
const serverList = [ "926874968925548554", "732692494621605909", "1050197888094974013" ]

module.exports = {
    name: "info",
    category: "hazukumi",
    aliases: ["inf"],
    usage: "info",
    permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
    ownerOnly: false,
    description: "Affiche les données du membre.",
    async run(Izuna, message, args, guildSettings) {
        if (!serverList.find(e => e === message.guild.id)) return message.reply("Commande indisponnible sur le serveur.");

        const dbStats = await Izuna.findUserXp(message.author.id, message.guild.id);

        if (!dbStats) {
            return
        }

        const statsEmbed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Informations sur le membre")
            .setThumbnail(message.author.displayAvatarURL())
            .addFields([
                { name: "Nom", value: `${message.author.tag}`, inline: false },
                { name: "Experience : ", value: `XP actuelle : **${dbStats.userXp}**  \n Xp avant le prochain niveau : **${(dbStats.userLevel * 60) - dbStats.userXp}**`, inline: false },
                { name: "Niveau Actuel :", value: `**${dbStats.userLevel}**`, inline: false },
                { name: "Coins : ", value: `**${dbStats.userCoins}**`, inline: false },
            ])


        message.channel.send({ embeds: [statsEmbed]});
    },
    async runInteraction(Izuna, interaction, guildSettings) {
        if (!serverList.find(e => e === interaction.guild.id)) return interaction.reply("Commande indisponnible sur le serveur.");

        const dbStats = await Izuna.findUserXp(interaction.user.id, interaction.guild.id);

        if (!dbStats) {
            return
        }

        const statsEmbed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Informations sur le membre")
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields([
                { name: "Nom", value: `${interaction.user.tag}`, inline: false },
                { name: "Experience : ", value: `XP actuelle : **${dbStats.userXp}**  \n Xp avant le prochain niveau : **${(dbStats.userLevel * 60) - dbStats.userXp}**`, inline: false },
                { name: "Niveau Actuel :", value: `**${dbStats.userLevel}**`, inline: false },
                { name: "Coins : ", value: `**${dbStats.userCoins}**`, inline: false },
            ])


        interaction.reply({ embeds: [statsEmbed]});
    }
}
