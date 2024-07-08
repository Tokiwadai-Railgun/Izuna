	// tentative en pause, réflexion nécessaire à comment on attribue les points plus tards.

const { ReactionUserManager, InteractionWebhook, EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const userGamesInfoModel = require("../../models/game.js")

module.exports = {
    name: "game_config",
    category: "games",
    aliases: ["gconfig"],
    usage: "gameconfig <game> <InGame username>",
    permissions: [PermissionsBitField.Flags.SendMessages],
    ownerOnly: true,
    description: "Configurer les donnés relative au serveur.",
    async run(Izuna, message) {
        message.reply("Commande uniquement disponnible via les / commands pour l'instant")
        },
    options : [
        {
            name: "game",
            description: "Les données du jeu que vous voulez modifier.",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "League of Legends",
                    value: "LoL",
                    description: "League of Legends"
                }
            ]
        },
        {
            name: "nom_utilisateur",
            description : "votre nom d'utilisateur in game",
            type: ApplicationCommandOptionType.String,
            required: true
        }

        ],
    async runInteraction(Izuna, interaction) {
        // check du serveur
        if (interaction.guild.id !== "926874968925548554") return;
        console.log("2")

        // check du jeu
        const game = interaction.options.getString("game");
        const pseudo = interaction.options.getString("nom_utilisateur");

        console.log("Game :" + game + " Pseudo : " + pseudo)
        let userGamesInfo = Izuna.getUserGamesInfo(interaction.user.id);
        // check si l'utilisateur a déjà certaines jeux d'enregistrer dans DB
        if (!userGamesInfo) {
            userGamesInfo = new userGamesInfoModel({
                userId: interaction.user.id,
                leagueOfLegends: {
                    pseudo: "",
                    level: 0,
                }
            })
        }

        // Selon le jeu paramétrer les différentes

        switch (game) {
            
            case "LoL" :
                // check de la véracité du pseudo.
                const playerAccountInfo = Izuna.getLoLAccountInfo(pseudo);
                if (!playerAccountInfo) return interaction.reply("Nom d'invocateur incorrect.")
                // sécurité, on demande un changement de status pour vérifier que l'utilisateur est bien pocesseur du compte

                const filter = (reaction, user) => {
                    return(reaction.emoji.name === "check");
                }
                const message = await interaction.reply({ fetchReply: true, content : "Veuillez chancer votre photo de profile en la photo ci dessous puis cliquer sur la réaction", files: [ {attachment: "./Images/LoL/10.10.3224670/img/profileicon/1.png", name: "summonerIcon1.png"}]});
                await message.react("✅");
                message.awaitReactions({
                    filter,
                    max: 1,
                    time: 120000,
                    errors: ["time"]
                }).then( rep => {
                    // check dans l'api riot game status du joueur
                    // si ça correspond alors tout est ok et on envoie les données dans la BDD
                    // pour check on définie le truc dans une variable,

                    if (playerAccountInfo.profileIconId === "1" ) {
                        userGamesInfo.leagueOfLegends.pseudo =  pseudo;
                        return interaction.channel.send(`Données mise à jours, compte League of Legends ajouté : ${pseudo}`)
                        // transformer ce message en image.
                    } else {
                        return interaction.channel.send("Photo de profile différente de celle demandée, commande annulée")
                    }

                    // sinon on return
                }).catch( err => {
                    interaction.channel.send("Commande annulée")
                    return console.log("Commande gameConfig - LoL annumée, code d'erreur : " + err);
                })
                // une fois que tout est ok on change les valeurs .
                break;

            default :
                interaction.channel.send("Jeu inconnus")

        }


        // si oui lors on récupère les données pour les modifier par la suite.

        // si non alors on commence par tout créer puis on lance setup

    }
}