const { EmbedBuilder, ApplicationCommandOptionType,PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, Embed  } = require('discord.js');
const { runInteraction } = require('../utils/ping');

// boutton pour la création de règles
const newRuleButton = new ButtonBuilder()
    .setCustomId("new-rule")
    .setLabel("Nouvelle règle")
    .setStyle(ButtonStyle.Success)
    
const row = new ActionRowBuilder()
    .setComponents(newRuleButton)

//boutton de validation
const validateButton = new ButtonBuilder()
    .setCustomId("rule-validate")
    .setLabel("Approuver les règles")
    .setStyle(ButtonStyle.Success)

const validateButtonRow = new ActionRowBuilder()
    .setComponents(validateButton)

module.exports = {
    name: "rules",
    aliases: ["rules",],
    usage: "izu rule -> échange de mesages",
    category: "moderation",
    permissions :[PermissionsBitField.Flags.Administrator],
    description: "Annonce un message à tous les membres du serveur sous forme d'un Embed.",
    run: (Izuna, message, args) => {
        message.channel.send("Commande uniquement disponnible en /command poour le moment")
    },
    runInteraction: (Izuna, interaction, guildSettings) => {
        // envoie du premier message des règles

        // création d'un embed
        const ruleEmbed = new EmbedBuilder()
            .setTitle(`Règles de ${interaction.guild.name}`)
            .addFields([])
        
        const ruleAddEmbed = new EmbedBuilder()
            .setTitle("Ajouter une nouvelle règle ?")

        ruleMessage = interaction.channel.send({ embeds:[ruleEmbed], components: [validateButtonRow] })    
        .then(async msg => {
            // ajout de l'id du message dans la database
            await Izuna.updateGuild(interaction.guild, { rulesMessage: msg.id })            
        })
        interaction.reply({ embeds:[ruleAddEmbed], components: [row] })


    }

    // faire avec create / add / remove
}
