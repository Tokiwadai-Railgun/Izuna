const { ReactionUserManager } = require("discord.js");
const { Guild } = require("../../models/index");

module.exports = {
    name: "update",
    category: "admin",
    aliases: ["updateGuild", "uptatedb"],
    usage: "update",
    ownerOnly: true,
    specialArgs: ["guildMemberAdd", "guildMemberRemove", "guildCreate"],
    permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADMINISTRATOR"],
    description: "Simule un évènement au choix.",
    async run(Izuna, message, args) {
        await Guild.updateMany({}, { $set: { "warnChannel": "1234567891011" }, upsert: true });
        message.reply("Donnée mise à jours.");
    },
    async runInteraction(Izuna, interaction) {
        await Guild.updateMany({}, { $set: { "warnChannel": "1234567891011" }, upsert: true });
        interaction.reply("Donnée mise à jours.");
    }
}