const { Guild } = require("../../models/index")
const Logger = require("../../utils/logger")

module.exports = {
    name: "guildCreate",
    once: false,
    async execute(Izuna, guild) {
        const createGuild = await new Guild({ guildId: guild.id });
        createGuild.save().then(g => console.log(`Guild ${g.name} added! (${g.id})`)).catch(err => console.log(err));
    }
}