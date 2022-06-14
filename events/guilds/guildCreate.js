module.exports = {
    name: "guildCreate",
    once: false,
    async execute(Izuna, guild) {
        await Izuna.createGuild(guild);
    }
}