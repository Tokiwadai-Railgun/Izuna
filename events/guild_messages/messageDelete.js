const { EmbedBuilder } = require("discord.js");

const serverList = ["926874968925548554", "940378368426278965", "732692494621605909"]

module.exports = {
    name: "messageDelete",
    once: false,

    async execute(Izuna, message) {
        if (message.guild.id != "926874968925548554");

        if (serverList.includes(message.guild.id)) {

            const guildSettings = await Izuna.getGuild(message.guild);
            console.log(message.content)

            if (!guildSettings) return


            // création d'un embed 
            const logEmbed = new EmbedBuilder()
                .setTitle("Message supprimé")
                .setThumbnail(message.author.displayAvatarURL())
                .addFields([
                    { name: "Auteur : ", value: `${message.author}`},
                    { name: "Contenus : ", value: ` \`\`\`${message.content} \`\`\` `}
                ])
                .setColor("#7F0856")
            message.guild.channels.cache.get(guildSettings.logChannel).send({ embeds: [logEmbed]})

        }
    }
}