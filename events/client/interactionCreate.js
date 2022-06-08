module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(Izuna, interaction) {
        // console.log de debug, pour savoir la dernière commande lancée avant un eventuelle crash
        console.log(`${interaction.guild.name} : ${interaction.channel.name} : ${interaction.user.tag} : ${interaction.type} : ${interaction.commandName} : ${interaction.customId}`);

        if (interaction.isCommand() || interaction.isContextMenu()) {
            const cmd = Izuna.commands.get(interaction.commandName);

            if (!interaction.member.permissions.has(cmd.permissions)) return interaction.reply("Vous n'avez pas les permissions pour utiliser cette commande.");

            if (!cmd) {
                console.log(`[ERROR] Command ${interaction.commandName} not found`);
                interaction.reply("Commande introuvable");
            } 

            cmd.runInteraction(Izuna, interaction);

        }
    }
}