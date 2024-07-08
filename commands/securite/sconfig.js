const { ReactionUserManager, InteractionWebhook, EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const securityDb = require("../../models/securityModel.js");
const userXpData = require("../../models/userXpData");

module.exports = {
    name: "security_config",
    category: "securite",
    aliases: ["sconfig"],
    usage: "securityconfig <key> [value]",
    specialArgs: ["status","spamProtectStatus","adminRoles","adminMembers", "(correspod  à <key>)"],
    permissions: [PermissionsBitField.Flags.Administrator],
    ownerOnly: true,
    description: "Configurer les donnés relative au serveur.",
    async run(Izuna, message, args, guildSettings) {
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
                // let rep = await Izuna.awaitUserMessage(interaction.channel, interaction.user);
                interaction.channel.awaitMessages(
                    { 
                        filter: m => m.author.id == interaction.user.id,
                        max: 1, 
                        time: 10000, 
                        errors: ["time"] 
                    }).then(rep => {
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
                            /* Deux choses à patch : 
                            - Refaire la chose avec un array et non un string
                            - Ajouter un message de confirmation de suppression si la donnée est déjà présente dans la BDD
                            */


                            // on récupère les mentions papropriés
                            let mentions = rep.mentions.users;
                            let numberOfValueGot = mentions.size;
                            let valueGot = [];
                            let valueToDelete = [];

                            // on ajoute les id dans la liste
                            for (let i = 0; i < numberOfValueGot; i++) {
                                valueGot.push(mentions.at(i).id);
                                console.log(valueGot)

                                // on détecte les valeurs qui sont déjà présentes
                                if (serverSecInfo.adminMembers.includes(mentions.at(i).id)) {
                                    valueToDelete.push(mentions.at(i).id);
                                }
                            }

                            // on demande à l'utilisateur si il veut supprimer les données déjà présentes et de mentionner celles qu'il ne veux pas supprimer
                            if (valueToDelete.length > 0) {
                                for (let i = 0; i < valueToDelete.length; i++) {
                                    console.log(i)
                                    interaction.channel.send(`L'utilisateur ${interaction.guild.members.cache.get(valueToDelete[i])} est déjà présent dans la liste des administrateurs. Voulez-vous le supprimer (oui/non)?`);

                                    const collector = interaction.channel.createMessageCollector({
                                        filter: m => m.author.id == interaction.user.id,
                                        max: 1,
                                        time: 20000,
                                        errors: ["time"]
                                    });

                                    await collector.on("collect", async (rep) => {
                                        if (rep.content.toLowerCase() === "non") {   
                                        } else if (rep.content.toLowerCase() === "oui") {
                                            // on supprime la valeure de la BDD
                                            let supprValue = serverSecInfo.adminMembers.splice(serverSecInfo.adminMembers.indexOf(valueToDelete[i]), 1);
                                            console.log(1)
                                            Izuna.updateSecurityInfo(interaction.guild.id, key, { adminMembers: supprValue }).catch(err => console.log(err));
                                            i ++;
                                        } else {
                                            interaction.channel.send("Valeur non valide. Commande annulée");
                                            return;
                                        }
                                    })
                                }
                            } else {
                                let valueSynt =  [...serverSecInfo.adminMembers, ...valueGot] // on combine les deux Array pour pouvoir les sauvegarder (les ... permettent d'obtenir les valeurs d'un Array pour les ajouter à un autre)

                                Izuna.updateSecurityInfo(interaction.guild.id, key, { adminMembers: valueSynt }).catch(err => console.log(err)); // et on sauvegarde le tout dans la BDD 
                                interaction.channel.send("Mise à jour effectuée, membres présents : " + valueSynt);
                            }

                            

                            /// place aux rôles ///
                        }  else if (typeOfValueNeeded === "role") {
                            let mentions = rep.mentions.roles;
                            let numberOfValueGot = mentions.size;
                            let valueGot = [];
                            let valueToDelete = [];

                            for (let i = 0; i < numberOfValueGot; i++) {
                                valueGot.push(mentions.at(i).id);
                                console.log(valueGot)

                                // on détecte les valeurs qui sont déjà présentes
                                if (serverSecInfo.adminRoles.includes(mentions.at(i).id)) {
                                    valueToDelete.push(mentions.at(i).id);
                                }
                            }

                            // on demande à l'utilisateur si il veut supprimer les données déjà présentes et de mentionner celles qu'il ne veux pas supprimer
                            if (valueToDelete.length > 0) {
                                for (let i = 0; i < valueToDelete.length; i++) {
                                    console.log(i)
                                    interaction.channel.send(`Le rôle ${interaction.guild.roles.cache.get(valueToDelete[i])} est déjà présent dans la liste des rôles administrateurs. Voulez-vous le supprimer (oui/non)?`);

                                    const collector = interaction.channel.createMessageCollector({
                                        filter: m => m.author.id == interaction.user.id,
                                        max: 1,
                                        time: 20000,
                                        errors: ["time"]
                                    });

                                    await collector.on("collect", async (rep) => {
                                        if (rep.content.toLowerCase() === "non") {   
                                        } else if (rep.content.toLowerCase() === "oui") {
                                            // on supprime la valeure de la BDD
                                            let supprValue = serverSecInfo.adminRoles.splice(serverSecInfo.adminRoles.indexOf(valueToDelete[i]), 1);
                                            console.log(1)
                                            Izuna.updateSecurityInfo(interaction.guild.id, key, { adminRoles: supprValue }).catch(err => console.log(err));
                                            i ++;
                                        } else {
                                            interaction.channel.send("Valeur non valide. Commande annulée");
                                            return;
                                        }
                                    })
                                }
                            } else {
                                let valueSynt =  [...serverSecInfo.adminRoles, ...valueGot] // on combine les deux Array pour pouvoir les sauvegarder (les ... permettent d'obtenir les valeurs d'un Array pour les ajouter à un autre)

                                Izuna.updateSecurityInfo(interaction.guild.id, key, { adminRoles: valueSynt }).catch(err => console.log(err)); // et on sauvegarde le tout dans la BDD 
                            }
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
                    // à changer pour afficher l'état acthelle de la sécurité dans le serveur

                    let adminMembersName = []
                    for (let i = 0; i < serverSecInfo.adminMembers.length; i++) {
                        if (serverSecInfo.adminMembers[i] === "") continue
                        adminMembersName.push(interaction.guild.members.cache.get(serverSecInfo.adminMembers[i]));
                    }

                    let adminRolesName = []
                    for (let i = 0; i < serverSecInfo.adminRoles.length; i++) {
                        console.log(serverSecInfo.adminRoles[i])
                        if (serverSecInfo.adminRoles[i] === "") continue
                        adminRolesName.push(interaction.guild.roles.cache.get(serverSecInfo.adminRoles[i]));
                    }


                    const embed = new EmbedBuilder()
                        .setTitle("Etat de la sécurité")
                        //.setDescription("La fonction de sécurité permet de garder un contrôle sur une certain exploitation de bug d'un utilisateur voulant s'octroyer un rôle administrateur.")
                        .setThumbnail(interaction.guild.iconURL())
                        .addFields([
                            { name: "Fonctions", value: "La fonction de sécurité est séparée en plusieurs sous fonctions répertoriés ci-dessous, elles sont donc activables et désactivables séparéments."},
                            { name: "Status", value: serverSecInfo.status, inline: true },
                            { name: "Spam protect", value: serverSecInfo.spamProtectStatus, inline: true },
                            { name:'Rôles', value:'Les rôles répertoriés ci-dessous sont les différents rôles permettant de faire fonctionner la sécurité. Leurs utilités sont précités dans leurs pages dédiés ou dans celles des les fonctions qui les utilisent' },
                            { name: "Membres administrateurs", value: adminMembersName.join(", ") || "aucun", inline: true },
                            { name: "Rôles administrateurs (id)", value: adminRolesName.join(", ") || "aucun", inline: true },
                        ])
                        .setColor("#7F0856")
                        .setFooter({ iconURL: Izuna.user.avatarURL(), text:"Security Embed."})
                            


                    //　---- ボタン ----
                    const functionsButton = new ButtonBuilder()
                        .setLabel("Configuration des fonctions")
                        .setCustomId("security-functions")
                        .setStyle(ButtonStyle.Primary)
                    
                    const buttonButton = new ButtonBuilder()
                        .setLabel("Configuration des boutons")
                        .setCustomId("security-buttons")
                        .setStyle(ButtonStyle.Primary)
                    
                    


                    const row = new ActionRowBuilder()
                        .addComponents(globalStatusButton, spamProtectStatus, inviteBlockStatus, adminRoleButton, moderatorRoleButton)

                    interaction.reply({embeds: [embed], components:[row]});
                    break;
            }
    }
}