const { Guild } = require("../../models/index")
const Logger = require("../../utils/logger")

module.exports = {
    name: "threadCreate",
    once: false,
    async execute(Izuna, thread) {
        if (thread.guild.id === "926874968925548554") {
            if (thread.isText()) thread.join();
            const logChannel = Izuna.channels.cache.get("926874969399500804");
        }
    }
}