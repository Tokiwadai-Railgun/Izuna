const serverList = ["926874968925548554", "940378368426278965", "732692494621605909"]

module.exports = {
    name: "messageDelete",
    once: false,

    async execute(Izuna, message) {
        if (serverList.includes(message.guild.id)) {

            const guildSettings = await Izuna.getGuild(message.guild.id);
            console.log(guildSettings)

            if (!guildSettings) return

            message.guild.channels.cache.get(guildSettings.logChannel).send(`Message supprimé : ${message}`)

        }
    }
}