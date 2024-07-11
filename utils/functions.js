const Guild = require("../models/guild.js");
const userXpData = require("../models/userXpData.js");
const securityModel = require("../models/securityModel.js");
const logger = require("../utils/logger.js");
const { Interaction, EmbedBuilder} = require("discord.js");
const guild = require("../models/guild.js");
const gameModel = require("../models/game.js")
const dotenv = require("dotenv"); dotenv.config();
const axios = require("axios");

const userDuGroupeXpData = require("../models/userDuGroupeXpData.js")
const hoyolabData = require('../models/hoyolab.js');

module.exports = Izuna => {
    Izuna.getGuild = async guild => {
        const guildData = await Guild.findOne({ guildId: guild.id });
        return guildData;
    };

    Izuna.createGuild = async guild => {
        const createGuild = new Guild({ guildId: guild.id });
        createGuild.save().then(g => console.log(`Guild added! (${g.guildId})`)).catch(err => console.log(err));
    }

    Izuna.updateGuild = async (guild, settings) => {
        let guildData = await Izuna.getGuild(guild);

        if (typeof guildData != "object") guildData  = {}  
        
        for (const key in settings) {
            if (guildData[key] != settings[key]) guildData[key] = settings[key];
        }

        return guildData.updateOne(settings);
    }



    // XP

    Izuna.findUserXp = async (memberId, guildId) => {
        if (guildId == "732692494621605909") {
            const userData = await userXpData.findOne({ userId: memberId });
            return userData;

        } else if (guildId === "1050197888094974013" || guildId === "926874968925548554") {
            const userData = await userDuGroupeXpData.findOne({ userId: memberId});
            return userData;
        }

    
    }

    Izuna.createUserXp = async (memberId, guildId) => {
        if (guildId === "1050197888094974013" || guildId == "926874968925548554") {
            const createUserXp = new userDuGroupeXpData({ userId: memberId });
            createUserXp.save().then(g => console.log(`UserXP added in the groupe! (${g.userId})`)).catch(err => console.log(err));
        } else {
            const createUserXp = new userXpData({ userId: memberId });
            createUserXp.save().then(g => console.log(`UserXP added! (${g.userId})`)).catch(err => console.log(err));
        }

    }

    Izuna.updateUserXp = async (memberId, memberSettings, guildId) => {
        // pas besoin de modifier pour la conférence vu que le tri est déjà fait avec la fonction findUserXp()

        let userData = await Izuna.findUserXp(memberId, guildId);

        if (typeof userData != "object") userData  = {}
        for (const key in memberSettings) {
            if (userData[key] != memberSettings[key]) userData[key] = memberSettings[key];
        }
        return userData.updateOne(userData);
    }


    Izuna.updateSecurityInfo = async (guildId, key, value) => {
        let guildSecurityData = await securityModel.findOne({ guildId: guildId });

        if (!guildSecurityData) return logger.error("Guild security data not found!" + Izuna.guilds.cache.get(guildId).name);
        
        switch(key) {
            case "status":
                console.log(value)
                console.log(guildSecurityData)
                guildSecurityData.status = value.status;
                break;
            case "adminRoles":
                guildSecurityData.adminRoles = value.adminRoles;
                break;
            case "adminsMembers":
                guildSecurityData.adminMembers = value.adminMembers;
                break;
            case "spamProtectStatus":
                guildSecurityData.spamProtectStatus = value.spamProtectStatus;
                break;
            default:
                console.log("Key not found!")
                break;

        }

        return guildSecurityData.updateOne(value);
    }

    Izuna.getSecurityData = async(guildId) => {
        let guildSecurityData = await securityModel.findOne({guildId: guildId});

        return guildSecurityData;
    }


    // jeux sur Hazukumi

    Izuna.getUserGamesInfo = async(userId) => {
        const userGames = await gameModel.findOne({ userId: userId})

        return userGames;
    }

    Izuna.updateUserGameInfo = async(userId, newGameInfo) => {
        if (!userGameInfo || ! userId) return "Eroor : Missing Data";

        let userGameInfo = Izuna.getUserGamesInfo(userId)
        await userGameInfo.updateOne({_id: userGameInfo._id}, newGameInfo);
    }

    Izuna.getLoLAccountInfo = async(pseudo) => {
        // check dans l'API riot game pour obtenir l'historique de parties du joueur
        const playerLoLAccountInfo =axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${pseudo}?api_key=${process.env.RIOT_API_KEY}`).then(response => response.data).then(data =>{ return data});
        return playerLoLAccountInfo;
    }

    Izuna.getLoLRankInfo = async(pseudo) => {
        let userAccountInfo = Izuna.getLoLAccountInfo(pseudo)
        const playerAccountId = userAccountInfo.id

        const playerLoLRankInfo = JSON.parse(axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerAccountId}?api_key=${process.env.RIOT_API_KEY}`));
        return playerLoLRankInfo;
    }


    Izuna.createTemporaryId = async() => {
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const characters = alphabet.concat(digits);

        let id = "";
        for (let i = 0; i < 10; i++) {
            let number = Math.floor(Math.random() * (characters.length));
            id += characters[number]
        }

        return id;
    }




    // Auto Annonce dans Maj-Izuna

    Izuna.patchNote = async(title, message, author) => {
        // création d'un embed
        const patchNoteEmbed = new EmbedBuilder()
            .setColor("#6f28af")
            .setTitle(title)
            .setAuthor({ name : author.tag, iconUrl: author.displayAvatarURL() })

    }

    Izuna.staffRoleEdit = async(guildId, setting) => {
        // actions can be add / delete
        // setting regroupe le poste à modifier et la rôle ex : { "moderatorRole": "02470321206557836" }

        let guildData = await Izuna.getGuild(guildId);

        if (typeof guildData != "object") guildData  = {}  
        
        for (const key in setting) {
            if (guildData[key] != setting[key]) guildData[key] = setting[key];
        }

        return guildData.updateOne(setting);
        
    }


    // Genshin related functions
    Izuna.getHoyoData = async(userId) => {
        const data = await hoyolabData.findOne({ discord_userId: userId})
        return data;
    }

    Izuna.updateHoyoData = async(userId, newHoyoData) => {
        let data = await Izuna.getHoyoData(userId)
        return data.updateOne(newHoyoData);

    }

    Izuna.createHoyoData = async(userId, ltoken, ltuid, genshin_uid, hsr_uid) => {
        if (!genshin_uid || !hsr_uid || !ltoken || !ltuid || !userId) return "Error : Missing Data";

        const createHoyoData = new hoyolabData({ discord_userId: userId, genshin_uid: genshin_uid, hsr_uid: hsr_uid, ltoken: ltoken, ltuid: ltuid });
        createHoyoData.save()
            .then(g => {
                console.log(`hoyolabData added! (${g.discord_userId})`)
                return "Données Crées";
            })
            .catch(err => console.log(err));
    }
}
