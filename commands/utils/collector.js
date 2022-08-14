const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: "collector",
    aliases: ["collector"],
    category: "utils",
    usage: "collector",
    permissions :[PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    description: "nothing !",
    run: async (Izuna, message, args) => {
        const filter = (reaction, user) => {
             
            return !user.bot && reaction.emoji.name === "🔨" && user.id === message.author.id;
        };

        await message.react("🔨");

        const collector = message.createReactionCollector({filter, time: 6000 });

        collector.on("end", collected => {
            if (collected.size == 1) return message.channel.send("L'auteur du message a réagis")
            else return message.channel.send("L'auteur du message n'a pas réagi")
        });

        collector.on("collect", (reaction, user) => {
            message.channel.send(`${user.username} a réagi avec ${reaction.emoji.name}`)
        });
    
    },
    runInteraction: async (Izuna, interaction) => {
        interaction.reply("Tapez le message \"discord\"");

        const filter = msg => msg.content === "discord";
        const collector = interaction.channel.createMessageCollector({filter, time: 6000 });

        collector.on("end", collected => {
            interaction.followUp(`${collected.size} messages contenant "discord" détéctés`)
        })
    }
}