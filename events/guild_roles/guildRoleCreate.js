const { PermissionsBitField, SlashCommandSubcommandGroupBuilder } = require("discord.js")
const securityDb = require("../../models/securityModel.js")

module.exports = {
    name: "roleCreate",
    once: false,
    async execute(Izuna, role) {
        // regarder si le serveur possède la fonction de sécuritée d'active. ok
        // -> il oui alors on regarde si le rôle à des perms admin et le cas échéant on les supprime, sinon on fait rien

        guildSecurityData = Izuna.getSecurityData(role.guild.id);
        if (!guildSecurityData || guildSecurityData.status === "off") return

        adminPerms = [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageRoles]

        if (role.permissions.has(adminPerms)) console.log("Admin perm detected")
    }
}