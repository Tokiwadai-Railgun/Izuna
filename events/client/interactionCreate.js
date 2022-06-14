module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(Izuna, interaction) {
        // console.log de debug, pour savoir la dernière commande lancée avant un eventuelle crash
        console.log(`${interaction.guild.name} : ${interaction.channel.name} : ${interaction.user.tag} : ${interaction.type} : ${interaction.commandName} : ${interaction.customId}`);

        let guildSettings = await Izuna.getGuild(interaction.guild);
        if (!guildSettings) {
            Izuna.createGuild(interaction.guild);
            guildSettings = await Izuna.getGuild(interaction.guild);
            interaction.reply("Une mise à jours est survenue, vous pouvez retaper la commande");
            return Izuna.channels.cache.get(guildSettings.logChannel).send(`Données du serveur mise à jours.`);
        }


        if (interaction.isCommand() || interaction.isContextMenu()) {
            const cmd = Izuna.commands.get(interaction.commandName);

            if (!interaction.member.permissions.has(cmd.permissions)) return interaction.reply("Vous n'avez pas les permissions pour utiliser cette commande.");

            if (!cmd) {
                console.log(`[ERROR] Command ${interaction.commandName} not found`);
                interaction.reply("Commande introuvable");
            } 

            cmd.runInteraction(Izuna, interaction, guildSettings);

        } else if (interaction.isButton()) {
            const button = Izuna.buttons.get(interaction.customId);

            if (!button) {
                console.log(`[ERROR] Button ${interaction.customId} not found`);
                interaction.reply("Bouton introuvable");
            }

            button.runInteraction(Izuna, interaction, guildSettings);
        } else if (interaction.isSelectMenu()) {
            const selectMenu = Izuna.selects.get(interaction.customId);

            if (!selectMenu) {
                console.log(`[ERROR] SelectMenu ${interaction.customId} not found`);
                interaction.reply("Menu de sélection introuvable");
            }

            selectMenu.runInteraction(Izuna, interaction, guildSettings);
        }
    }
}