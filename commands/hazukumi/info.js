const { ReactionUserManager, InteractionWebhook, EmbedBuilder } = require("discord.js");
const serverList = [ "926874968925548554", "732692494621605909" ]

module.exports = {
    name: "info",
    category: "hazukumi",
    aliases: ["inf"],
    usage: "info",
    permissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    ownerOnly: false,
    description: "Affiche les données du membre.",
    async run(Izuna, message, args, guildSettings) {
        console.log("info");
        if (!serverList.find(e => e === message.guild.id)) return message.reply("Commande indisponnible sur le serveur.");

        const dbStats = await Izuna.findUserXp(message.author.id);

        if (!dbStats) {
            await Izuna.createUserXp(message.member.id);
            userXpDb = await Izuna.findUserXp(message.member.id);
            Izuna.updateUserXp(message.member.id, { userCreatetag: message.member.user.tag });
        }

        const statsEmbed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Informations sur le membre")
            .setThumbnail(message.author.displayAvatarURL())
            .addFields([
                { name: "Nom", value: `${message.author.tag}`, inline: false },
                { name: "Experience : ", value: `XP actuelle : **${dbStats.userXp}**  \n Xp avant le prochain niveau : **${(dbStats.userLevel * 120) - dbStats.userXp}**`, inline: false },
                { name: "Niveau Actuel :", value: "**${dbStats.userLevel}**", inline: false },
                { name: "Coins : ", value: `**${dbStats.userCoins}**`, inline: false },
            ])


        message.channel.send({ embeds: [statsEmbed]});
    },
    async runInteraction(Izuna, interaction, guildSettings) {

    }
}
