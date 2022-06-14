module.exports = {
    name: "ready",
    once: true,
    async execute(Izuna) {
        console.log(`Izuna is ready! \n ------------------`);
    
        // commandes Instantanés (de test)
        const devGuild = await Izuna.guilds.cache.get("926874968925548554");//717098681809879092
        devGuild.commands.set(Izuna.commands.map(cmd => cmd));

        const testGuild = await Izuna.guilds.cache.get("973654683510001744");
        testGuild.commands.set(Izuna.commands.map(cmd => cmd));

        const hazukumi = await Izuna.guilds.cache.get("732692494621605909");
        hazukumi.commands.set(Izuna.commands.map(cmd => cmd));

        // commandes global -1h d'attente minimum
    }
}