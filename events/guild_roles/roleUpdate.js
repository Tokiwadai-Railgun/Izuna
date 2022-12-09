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

        const adminPerms = [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageRoles]

        for (role of guildSecurityData.adminRoles) {
            if (newRole.id === role) return
        }

        let i = 0;

        const editingPermissions = role.permissions;

        for (let perm of newRole.permissions) {

        // on essaie les permisions pour ne garder que celles qui sont "saines"
          if (adminPerms.includes(perm)) {
            console.log(`permissions ${perm.bitfield.Flag} détéctée sur le rôle ${newRole.name} : permissions supprimée`)
            editingPermissions.remove(perm);
            
            
            // eventuellement continuer avec un message.send
          }
        }

        // maintenant que l'on a une version triée des permissions, on push cette nouvelle version dans le rôle
        newRole.edit({ permissions: editingPermissions});
    }
}
