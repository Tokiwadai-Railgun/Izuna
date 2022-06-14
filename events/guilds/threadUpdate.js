const { Guild } = require("../../models/index")
const Logger = require("../../utils/logger")
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "threadCreate",
    once: false,
    async execute(Izuna, oldThread, newThread) {
        if (oldThread.guild.id === "926874968925548554") {
            if (oldThread.archived && !newThread.archived) {
                console.log("1")
                const logChannel = Izuna.channels.cache.get("926874969399500804");
                const logEmbed = new MessageEmbed()
                    .setTitle("Thread restauré")
                    .setDescription(`Le thread ${newThread.name} a été restauré`)
                    .setTimestamp()
                
                logChannel.send({embeds:[logEmbed]});

                newThread.join();
            }
        }
    }
}