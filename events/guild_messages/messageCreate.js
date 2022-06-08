const PREFIX = "izu "
const { Permissions } = require("discord.js")

module.exports = {
    name: "messageCreate",
    once: false,
    execute(Izuna, message) {
        // console.log de debug, pour savoir la dernière commande lancée avant un eventuelle crash
        console.log(`${message.guild.name} : ${message.author.tag} : ${message.content} | Embed : ${message.embeds.length}`);


        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

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
        command.run(Izuna, message, args);
    }
}