const { ReactionUserManager } = require("discord.js");

const { Guild } = require("../../models/index");

module.exports = {
    name: "reload",
    category: "admin",
    aliases: ["updateGuild", "uptatedb"],
    usage: "reload",
    ownerOnly: true,
    permissions: [],
    description: "Redémarre le bot",
    async run(Izuna, message, args) {
        // const devGuild = await Izuna.guilds.cache.get("926874968925548554")
        // devGuild.commands.set([])

        await message.reply("Redémarrage en cours...");
        return process.exit();
    },
    async runInteraction(Izuna, interaction) {
        // const devGuild = await Izuna.guilds.cache.get("926874968925548554")
        // devGuild.commands.set([])

        await interaction.reply("Redémarrage en cours...");
        return process.exit();
    }
}