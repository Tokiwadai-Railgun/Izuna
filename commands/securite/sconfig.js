const { ReactionUserManager, InteractionWebhook, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const securityDb = require("../../models/securityModel.js");
const userXpData = require("../../models/userXpData");

module.exports = {
    name: "security_config",
    category: "admin",
    aliases: ["sconfig"],
    usage: "securityconfig <key> [value]",
    specialArgs: ["status","spamProtectStatus","adminRoles","adminMembers", "(correspod  à <key>)"],
    permissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    description: "Configurer les donnés relative au serveur.",
    async run(Izuna, message, args, guildSettings) {
        console.log(args[0]);
        if (!args[0] || !args[0].match(/^(prefix|logChannel|wlcChannel)$/)) return message.reply(`Clefs non valide ou non précisée, tapez ` + "``" + guildSettings.prefix + "help dbconfig" + "``" + ` pour la liste des clefs.`);

        const key = args[0];
        const value = args[1]; 
        
    },
    options : [
        {
            name: "key",
            description: "Ce que vous voulez changer.",
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: [
                {
                    name: "status",
                    value: "status",
                    description: "Status d'activation."
                },
                {
                    name: "admin_roles",
                    value: "adminRoles",
                    description: "Les rôles ayant des permissions dangereuses."
                },
                {
                    name: "admins_members",
                    value: "adminsMembers",
                    description: "Les personnes (bot comprises) pouvant acceder aux \"adminRoles\"."
                },
                {
                    name: "spam_protect_status",
                    value:"spamProtectStatus",
                    description: "Status de l'anti-spam."
                }
            ]
        },
        
    ],
    async runInteraction(Izuna, interaction, guildSettings) {
        const key = interaction.options.getString("key");
        const dbValues = await securityDb.findOne({ guildId: guildSettings.guildId });
        const serverSecInfo = await securityDb.findOne({ guildId: interaction.guild.id});

        if (!dbValues) {
            const newDbValues = new securityDb({ guildId: guildSettings.guildId || interaction.guid.id });
            newDbValues.save().then(g => console.log("New security database created for guild " + g.guildId)).catch(err => console.log(err));

            interaction.reply("La base de données de sécurité a été créée veuillez retaper la commande.");
            return;
        }
        // fonction que l'on va appeler pour chaque clef, ça évite les répétitions
        async function valueEntrance (valueNeeded, typeOfValueNeeded) {
            // combien de "valueNeeded" voulez vous ajouter
            // veuillez indiquer "la valeure"/"le nombre de "valueNeeded" que vous voulez ajouter"

            
            // on regarde quel est la nature de la valeure attendue pour adapter la réponse
            if (typeOfValueNeeded === "status")  {
                interaction.reply("Début de la configuration")
                await interaction.channel.send("Veuillez indiquer le status :.");
                console.log(interaction.user.id)
                // let rep = await Izuna.awaitUserMessage(interaction.channel, interaction.user);
                interaction.channel.awaitMessages(
                    { 
                        filter: m => m.author.id == interaction.user.id,
                        max: 1, 
                        time: 10000, 
                        errors: ["time"] 
                    }).then(rep => {
                        console.log(rep.first().content);
                        if (rep.content != "on" && rep != "off") {
                            Izuna.updateSecurityInfo(interaction.guild.id, key, { status: rep.first().content }).catch(err => console.log(err)); // et on sauvegarde le tout dans la BDD 
                            interaction.channel.send("Mise à jour effectuée.");
                        
                        }
                        else {
                            interaction.reply("Valeure non valide.");
                            return;
                        }
                    }).catch(err => {
                        console.log(err);
                        interaction.channel.send("Vous n'avez pas répondu dans le temps imparti.");
                        return;
                    })


                } else if (typeOfValueNeeded === "user" || "role") {
                    interaction.reply("Début de la configuration")
                    interaction.channel.send(`Veuillez indiquer les ${valueNeeded} que vous voulez ajouter :.`);

                    const collector = interaction.channel.createMessageCollector({
                        filter: m => m.author.id == interaction.user.id,
                        max: 1,
                        time: 20000,
                        errors: ["time"]
                    });

                    collector.on("collect", async (rep) => { 
                        // dans un premier temps on check si on obtiens le bon type de valeurs (user/role)
                        if (typeOfValueNeeded === "user") {
                            // on récupère les mentions papropriés
                            let mentions = rep.mentions.users;
                            let numberOfValueGot = mentions.size;
                            let valueGot = [];

                            console.log(mentions);

                            // on ajoute les id dans la liste
                            for (let i = 0; i < numberOfValueGot; i++) {
                                valueGot.push(mentions.at(i).id);
                            }

                            let valueSynt = serverSecInfo.adminMembers + ", " + valueGot.join(" "); // on transcrit tout en chaine de caractères pour pouvoir l'ajouter dans la base de données

                            Izuna.updateSecurityInfo(interaction.guild.id, key, { adminMembers: valueSynt }).catch(err => console.log(err)); // et on sauvegarde le tout dans la BDD 

                        }  else if (typeOfValueNeeded === "role") {
                            // on récupère les mentions papropriés
                            let mentions = rep.mentions.roles;
                            let numberOfValueGot = mentions.size;
                            let valueGot = [];
                            // on ajoute les id dans la liste
                            for (let i = 0; i < numberOfValueGot; i++) {
                                valueGot.push(mentions.at(i).id);
                            }

                            console.log(valueGot.join(", "))
                            let valueSynt = serverSecInfo.adminRoles+ ", " + valueGot.join(", "); // on transcrit tout en chaine de caractères pour pouvoir l'ajouter dans la base de données

                            Izuna.updateSecurityInfo(interaction.guild.id, key, { adminRoles: valueSynt }).catch(err => console.log(err)); // et on sauvegarde le tout dans la BDD                        
                        
                        }
                    });
                }
            }

            // on regarde ce dont on a besoin
            let returnedValue = null;
            switch (key) {
                case "status":
                    valueEntrance("status", "status");
                    break;
                case "adminRoles":
                    valueEntrance("adminRole", "role");
                    break;
                case "adminsMembers":
                    valueEntrance("adminMember", "user");
                    break;
                case "spamProtectStatus":
                    valueEntrance("spamProtectStatus", "status");
                    break;
                default:
                    // à chaner pour afficher l'état acthelle de la sécurité dans le serveur
                    let test = ["test", "deuxième test"] // serverSecInfo.adminMembers.push("test");
                    console.log(test);
                    Izuna.updateSecurityInfo(interaction.guild.id, "adminsMembers", { adminMembers: test }).catch(err => console.log(err)); // et on sauvegarde le tout dans la BDD
                    break;
            }
    }
}