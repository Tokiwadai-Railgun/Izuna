const { EmbedBuilder, Message, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "random_role_add",
    permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    runInteraction: async (Izuna, interaction) => {
        const role = interaction.guild.roles.cache.get("926874969009422357");
        const member = interaction.member

        if (member.roles.cache.has(role.id)) return interaction.reply("Vous possédez déjà le rôle : " + role.name);
        member.roles.add(role.id)
    }
}