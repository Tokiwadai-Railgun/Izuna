const { ReactionUserManager, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "test",
    category: "admin",
    aliases: ["test"],
    usage: "test <event>",
    specialArgs: ["guildMemberAdd", "guildMemberRemove", "guildCreate"],
    permissions: [PermissionsBitField.Flags.Administrator],
    description: "Simule un évènement au choix.",
    run: (Izuna, message, args) => {
    },
    options : [
    ],
    runInteraction: async (Izuna, interaction) => {
        const members = await interaction.guild.members.cache.map(member => member.id)

        const salaire = 10;
        console.log("salaire")
        console.log(salaire)
    }
}
