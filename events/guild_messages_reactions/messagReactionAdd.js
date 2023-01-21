const { MessageReaction } = require("discord.js");

module.exports = {
    name: "messageReactionAdd",
    once: false,
    async execute(Izuna, reaction, user) {
        if(reaction.guild.id != "926874968925548554")

        if (user.bot) return;
        const message = reaction.message;
        const member = message.guild.members.cache.get(user.id);
        const emojiName = reaction.emoji.name;

        if (MessageReaction.partial) {
            try {
                await MessageReaction.fetch();
            }
            catch (error) {
                console.log(`impossible de récupérer les messages : ${error}`);
            }

        }
        
        if (!member || !emojiName) return;
        if (emojiName === "📕") {
            message.delete();
        }
    }
}