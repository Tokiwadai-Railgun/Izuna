const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField, Embed } = require('discord.js');


module.exports = {
	name: "roles",
	aliases: ["role"],
	category: "amdin",
	usage: "roles",
	permissions :[PermissionsBitField.Flags.Administrator],
	description: "Permet de gérer les rôles liés au staff",
	run: async (Izuna, message, args) => {
        
	},
	options: [
		{
			name: "show",
			description: "affiche un rôle",
			type: ApplicationCommandOptionType.User,
			required: true
		},
		{
			name: "add",
			description: "Raison de l'expulsion",
			type: ApplicationCommandOptionType.String,
			required: false
		},
	],
	runInteraction: async (Izuna, interaction) => {
       // fonctionnement sans options
	   
	   const firstEmbed = new EmbedBuilder()
			.setTitle("Rôles des membres du staff")

		
	   // on affiche les rôples actuellement liés au staff 
	   // on met à disposition plusieurs bouttons permettannt de :! 
	   // --> Ajouter un rôle
	   // --> Supprimer des rôles

	   // fonctionnement plus précis 
	   // Un seul message, modification de ce dernier au cours de la procédure
	   // Un seul embed d'action dont on modifie le champ qui explique ce que l'on fait
	}
}