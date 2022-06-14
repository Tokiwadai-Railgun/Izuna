const { Guild } = require("../models");

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
}