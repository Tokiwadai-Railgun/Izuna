const { Permissions } = require("discord.js")

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(Izuna, message) {
        
        // console.log de debug, pour savoir la dernière commande lancée avant un eventuelle crash
        console.log(`${message.guild.name} : ${message.author.tag} : ${message.content} | Embed : ${message.embeds.length}`);

        if (message.channel.type === "dm") return;
        if (message.guild.id != "926874968925548554" && message.guild.id != "732692494621605909") return;

        let guildSettings = await Izuna.getGuild(message.guild);
        if (!guildSettings) {
            await Izuna.createGuild(message.guild);
            guildSettings = await Izuna.getGuild(message.guild);
            message.reply("Une mise à jours est survenue, vous pouvez retaper la commande");
            return Izuna.channels.cache.get(guildSettings.logChannel).send(`Données du serveur mise à jours.`);
        }

        const PREFIX = guildSettings.prefix;

        if (message.author.bot) return;

        // ajouter anti pub
        if (message.content.includes("discord.gg") && !message.member.permissions.has(Permissions.FLAGS.MENTION_EVERYONE)) {
            message.delete();
            // log
        }

        

        //ajouter xp

        if (!message.content.toLowerCase().startsWith(PREFIX)) return;

        const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        if (commandName.length = 0) return;
        

        // vérification des permissions nessessaires pour la commande et execution si ok
        let command = Izuna.commands.get(commandName);
        if (!command) return message.reply("Commande non reconnue.");

        if (!message.member.permissions.has([command.permissions])) return message.reply(`Permission(s) insufisante(s) (\`${command.permissions.join(", ")}\`), commande annulée`);
        
        
        if (command.ownerOnly) {
            if (message.author.id != "330026848052314112") return message.reply("Commande réservée aux développeurs.");
        }
        
        command.run(Izuna, message, args, guildSettings);

    }
}