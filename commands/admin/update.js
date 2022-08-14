const { ReactionUserManager, PermissionsBitField } = require("discord.js");
const guild = require("../../models/guild");
const { Guild } = require("../../models/index");

module.exports = {
    name: "update",
    category: "admin",
    aliases: ["updateGuild", "uptatedb"],
    usage: "update",
    ownerOnly: true,
    specialArgs: ["guildMemberAdd", "guildMemberRemove", "guildCreate"],
    permissions: [PermissionsBitField.Flags.Administrator],
    description: "Simule un évènement au choix.",
    async run(Izuna, message, args) {
        await Guild.updateMany({}, { $set: { "xp": "" }, upsert: true });
        message.reply("Donnée mise à jours.");
    },
    async runInteraction(Izuna, interaction) {
        await Guild.updateMany({}, { $set: { "xp": "" }, upsert: true });
        interaction.reply("Donnée mise à jours.");
    }
}