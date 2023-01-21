const Guild = require("../models/guild.js");
const userXpData = require("../models/userXpData.js");
const securityModel = require("../models/securityModel.js");
const logger = require("../utils/logger.js");
const { Interaction } = require("discord.js");
const guild = require("../models/guild.js");

const userDuGroupeXpData = require("../models/userDuGroupeXpData.js")

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

    Izuna.create


    Izuna.updateUserXp = async (memberId, memberSettings, guildId) => {
        // pas besoin de modifier pour la conférence vu que le tri est déjà fait avec la fonction findUserXp()

        let userData = await Izuna.findUserXp(memberId);

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









}
