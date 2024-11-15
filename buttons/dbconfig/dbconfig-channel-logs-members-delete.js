const {
  EmbedBuilder,
  PermissionsBitField,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: "dbconfig-channel-logs-delete",
  permissions: [PermissionsBitField.Flags.Administrator],
  runInteraction: async (Izuna, interaction, guildSettings) => {
    Izuna.updateGuild(interaction.guild, { messageLogChannel: "" });

    // Premeir embed
    const thirdEmbed = new EmbedBuilder()
      .setTitle("Modification terminée")
      .setDescription("Il n'y a désormais plus de salon d'archives")
      .setColor("#7F0856");

    interaction.reply("Actualisation");
    interaction.message.edit({ embeds: [thirdEmbed], components: [] });
    interaction.deleteReply();
  },
};
