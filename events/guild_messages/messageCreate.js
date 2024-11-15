const { Permissions, SlashCommandSubcommandGroupBuilder } = require("discord.js");
const guild = require("../../models/guild");

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(Izuna, message) {




        // console.log de debug, pour savoir la dernière commande lancée avant un eventuelle crash
        console.log(`${message.guild.name} : ${message.author.tag} : ${message.content} | Embed : ${message.embeds.length}`);

        if (message.channel.type === "dm") return;
        if (message.guild.id == "926874968925548554") return;

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

        if (message.guild.id === "732692494621605909" && message.channel.id != "819138310702235668") {
            const xp = Math.floor(Math.random() * 5) + 1;

            if (message.channel.id != "819138310702235668") {
                // await Izuna.addXP(message.member.id, xp);
            }

            // on cherche les données dans les données de la base de données
            let userXpDb = await Izuna.findUserXp(message.member.id, message.guild.id);

            if (!userXpDb) {
                await Izuna.createUserXp(message.member.id, message.guild.id);
                userXpDb = await Izuna.findUserXp(message.member.id, message.guild.id);
            }


            if (userXpDb) {

                let memberXp = userXpDb.userXp + xp;
                let memberLevel = userXpDb.userLevel;
                let memberCoins = userXpDb.userCoins

                const memberNeedeedXP = userXpDb.userLevel * 60;

                if (memberXp >= memberNeedeedXP) {
                    memberLevel++;

                    memberXp -= memberNeedeedXP;

                    message.reply(`Bravo, vous avez atteint le niveau ${memberLevel} !`);
                }

                Izuna.updateUserXp(message.member.id, { userXp: memberXp, userLevel: memberLevel, userCoins: memberCoins }, message.guild.id);
            }
        }


        // xp pour le serveur de la conférence 

        if (message.guild.id === "1050197888094974013" || message.guild.id === "926874968925548554") {
            const xp = Math.floor(Math.random() * 5) + 1;
            // on cherche les données dans les données de la base de données

            let userXpDb = await Izuna.findUserXp(message.author.id, message.guild.id);

            if (!userXpDb) {
                await Izuna.createUserXp(message.member.id, message.guild.id);
                userXpDb = await Izuna.findUserXp(message.author.id, message.guild.id);
            }


            if (userXpDb) {

                let memberXp = userXpDb.userXp + xp;
                let memberLevel = userXpDb.userLevel;
                let memberCoins = userXpDb.userCoins

                const memberNeedeedXP = userXpDb.userLevel * 60;

                if (memberXp >= memberNeedeedXP) {
                    memberLevel++;
                    memberXp -= memberNeedeedXP;

                    message.reply(`Bravo, vous avez atteint le niveau ${memberLevel} !`);
                }

                Izuna.updateUserXp(message.member.id, { userXp: memberXp, userLevel: memberLevel, userCoins: memberCoins }, message.guild.id);
                console.log("1")
            }

        }

        // commande

        if (!message.content.toLowerCase().startsWith(PREFIX)) return ;

        const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        if (commandName.length = 0) return console.log("problèmle");


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
