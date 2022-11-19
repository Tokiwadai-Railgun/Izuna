const { PermissionsBitField, SlashCommandSubcommandGroupBuilder } = require("discord.js");
const guild = require("../../models/guild.js");
const securityDb = require("../../models/securityModel.js")

module.exports = {
    name: "roleUpdate",
    once: false,
    async execute(Izuna, oldRole, newRole) {
        // regarder si le serveur possède la fonction de sécuritée d'active. ok
        // -> il oui alors on regarde si le rôle à des perms admin et le cas échéant on les supprime, sinon on fait rien

        guildSecurityData = await Izuna.getSecurityData(newRole.guild.id);
        if (!guildSecurityData || guildSecurityData.status == "off") return console.log("security disabled")

        adminPerms = [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageRoles]

        for (role of guildSecurityData.adminRoles) {
            if (newRole.id === role) return
        }

        let i = 0;

        for (perm of adminPerms) {
          console.log(perm)
          try {

            if (newRole.permissions.has(perm)) {
              console.log(`"${perm}" permission detected on "${newRole.name}" : permission removed (${newRole.guild.name})`)

                const rolePermissions = newRole.permissions.bitfield
                await rolePermissions.remove(PermissionsBitField.Flags.Administrator)

                newRole.setPermissions(0);
                newRole.setPermissions(rolePermissions)

                console.log(newRole.permissions)
            };
          } catch (e) {
            console.log(e)
          }


            i++




            // /!\ à finir : ne fonctionne pas
        }

    }
}
