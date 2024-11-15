const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField, Embed, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const guild = require("../../models/guild")

module.exports = {
	name: "roles",
	aliases: ["role"],
	category: "amdin",
	usage: "roles",
	permissions :[PermissionsBitField.Flags.Administrator],
	description: "Permet de gérer les rôles liés au staff",
	run: async (Izuna, message, args, guildSettings) => {
        message.reply("Disponnible uniquement en /command")
	},
	runInteraction: async (Izuna, interaction, guildSettings) => {
       // fonctionnement sans options
	   const adminRoleID = guildSettings.adminRole
	   const moderatorRoleID = guildSettings.moderatorRole
	   console.log(adminRoleID)
	   
	   const adminRole = (interaction.guild.roles.cache.get(adminRoleID)) ? interaction.guild.roles.cache.get(adminRoleID) : "Non définis"
	   const moderatorRole = (interaction.guild.roles.cache.get(moderatorRoleID)) ? interaction.guild.roles.cache.get(moderatorRoleID) : "Non définis"

	   // on affiche les rôples actuellement liés au staff 
	   const firstEmbed = new EmbedBuilder()
			.setTitle("Rôles des membres du staff")
			.addFields([
				{ name: "Conditions : ", value: "Il n'est pas possible de mettre plusieurs rôles par catégories, pour modifier les différents il faut avoir les permissions nécessaires : __Administrateur__ pour modifier les __Modérateurs__ et __propriétaire du serveur__ pour modifier les __Administrateurs__" },
				{ name: "Role Administrateur : ", value:` ${adminRole} `, inline: true },
				{ name: "Role Modérateur : ", value:` ${moderatorRole} `, inline: true }

			])		
	   // on met à disposition plusieurs bouttons permettannt de :! 
	   // --> Ajouter un rôle
	   // --> Supprimer des rôles

	   const changeModeratorButton = new ButtonBuilder()
			.setCustomId("moderator-role-action")
			.setLabel("Changer le rôle modérateur")
			.setStyle(ButtonStyle.Danger)
		
		const changeAdminButton =new ButtonBuilder()
			.setCustomId("admin-role-action")
			.setLabel("Changer le rôle administrateur")
			.setStyle(ButtonStyle.Danger)

		const row = new ActionRowBuilder()
			.addComponents([ changeAdminButton, changeModeratorButton ])

		interaction.reply({ embeds: [firstEmbed], components: [row] })
	   // fonctionnement plus précis 
	   // Un seul message, modification de ce dernier au cours de la procédure
	   // Un seul embed d'action dont on modifie le champ qui explique ce que l'on fait
	}
}