const {
  ReactionUserManager,
  InteractionWebhook,
  ApplicationCommandOptionType,
  PermissionsBitField,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const guild = require("../../models/guild");
module.exports = {
  name: "dbconfig",
  category: "admin",
  aliases: ["db"],
  usage: "dbconfig <key> [value]",
  specialArgs: ["prefix", "logchannel", "wlcChannel", "(correspod  à <key>)"],
  permissions: [PermissionsBitField.Flags.Administrator],
  ownerOnly: false,
  description: "Configurer les donnés relative au serveur.",
  async run(Izuna, message, args, guildSettings) {},
  async runInteraction(Izuna, interaction, guildSettings) {
    // refonte avec des bouttons

    // on récupère donc les données dans la bdd
    const logChannelID = guildSettings.logChannel;
    const messageLogChannelID = guildSettings.messageLogChannel;
    const wlcChannelID = guildSettings.wlcChannel
      ? guildSettings.wlcChannel
      : "Aucun";
    const prefix = guildSettings.prefix;
    const memberRoleID = guildSettings.memberRole;

    const logChannel = interaction.guild.channels.cache.get(logChannelID)
      ? interaction.guild.channels.cache.get(logChannelID)
      : "Aucun";
    const messageLogChannel = interaction.guild.channels.cache.get(
      messageLogChannelID,
    )
      ? interaction.guild.channels.cache.get(messageLogChannelID)
      : "Aucun";
    const wlcChannel = interaction.guild.channels.cache.get(wlcChannelID)
      ? interaction.guild.channels.cache.get(wlcChannelID)
      : "Aucun";
    const memberRole = interaction.guild.roles.cache.get(memberRoleID)
      ? interaction.guild.roles.cache.get(memberRoleID)
      : "Aucun";
    // Premier embed présentant le status actuel de la db
    console.log(interaction.user.avatarURL());
    const firstEmbed = new EmbedBuilder()
      .setTitle("État du serveur")
      .setDescription(
        "Configuation actuelle du serveur, pour la modifier veuillez intéragir avec les bouttons",
      )
      .addFields([
        { name: "Salon d'archives", value: `${logChannel}`, inline: true },
        {
          name: "Salon d'archives membre",
          value: `${messageLogChannel}`,
          inline: true,
        },
        { name: "Salon de Bienvenue", value: `${wlcChannel}`, inline: true },
        { name: "Rôle membre", value: `${memberRole}`, inline: true },
      ])
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.avatarURL(),
      })
      .setColor("#7F0856");

    //　---- ボタン -----

    const logChannelButton = new ButtonBuilder()
      .setLabel("Salon d'archives admin")
      .setCustomId("dbconfig-channel-logs")
      .setStyle(ButtonStyle.Primary);

    const messageLogChannelButton = new ButtonBuilder()
      .setLabel("Salon d'archives membres")
      .setCustomId("dbconfig-channel-logs-members")
      .setStyle(ButtonStyle.Primary);

    // ようこそ
    const wlcChannelButton = new ButtonBuilder()
      .setLabel("Salon de Bienvenue")
      .setCustomId("dbconfig-channel-welcome")
      .setStyle(ButtonStyle.Primary);

    const memberRoleButton = new ButtonBuilder()
      .setLabel("Rôle Membre")
      .setCustomId("dbconfig-role-member")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().setComponents([
      logChannelButton,
      messageLogChannelButton,
      wlcChannelButton,
      memberRoleButton,
    ]);

    interaction.reply({ embeds: [firstEmbed], components: [row] });
  },
};

