module.exports = {
    name: "ready",
    once: true,
    async execute(Izuna) {
        let guildsCount = await Izuna.guilds.fetch();
        let usersCount = await Izuna.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        console.log(`Izuna is ready! \n ------------------`);
        console.log(`Guilds: ${guildsCount.size} | Users: ${usersCount}`);
    
        // commandes Instantanés (de test)
        const devGuild = await Izuna.guilds.cache.get("926874968925548554");//717098681809879092
        devGuild.commands.set(Izuna.commands.map(cmd => cmd));
        

        Izuna.user.setPresence({activities: [{ name: "izu help", type:"LISTENING" }], status: "online"});

        // commandes global ~1h d'attente avant maj

    }
}