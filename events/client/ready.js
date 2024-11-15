module.exports = {
    name: "ready",
    once: true,
    async execute(Izuna) {
        let guildsCount = await Izuna.guilds.fetch();
        let usersCount = await Izuna.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        console.log(`Izuna is ready! \n ------------------`);
        console.log(`Guilds: ${guildsCount.size} | Users: ${usersCount}`);
    
        Izuna.user.setPresence({activities: [{ name: "izu help", type:"LISTENING" }], status: "online"});

        // commandes global ~1h d'attente avant maj
	Izuna.application.commands.set(Izuna.commands.map( cmd => cmd ).filter(cmd => !cmd.custom || cmd.custom == true))
        require("../../repeated-functions/hoyolab-daily")(Izuna)
    }
}
