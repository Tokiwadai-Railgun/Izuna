const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "role_add-menu",
    runInteraction: async (Izuna, interaction) => {
        const member = interaction.member;

        if (member.roles.cache.has(interaction.values[0])) return interaction.reply({ content: "Vous possédez déjà le rôle", ephemeral: true });
        member.roles.add(interaction.values[0]);
        interaction.reply({ content: "Vous avez bien obtenus le rôle", ephemeral: true });
    }
}