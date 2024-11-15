const { MessageReaction } = require("discord.js");

module.exports = {
  name: "messageReactionAdd",
  once: false,
  async execute(Izuna, reaction, user) {
    if (reaction.message.channel.id == "1199993372602011718") {
      const allowedPersons = ["339424947711770627", "330026848052314112", "939280795061866567"]
      if (allowedPersons.includes(user.id) == false) return;
      if (reaction.emoji.name == "✅") {
        const NECRole = await reaction.message.guild.roles.fetch("1199999245873324073")
        // Getting guild number with the user
        const member = await reaction.message.guild.members.fetch(reaction.message.author.id)

        // Then we add the corresponding role
        member.roles.add(NECRole)
      } else if (reaction.emoji.name == "☑️") {
        const COFLRole = await reaction.message.guild.roles.fetch("1199999239342796810")
        // Getting guild number with the user
        const member = await reaction.message.guild.members.fetch(reaction.message.author.id)

        // Then we add the corresponding role
        member.roles.add(COFLRole)
      }
    } 


    if(reaction.message.guild.id != "926874968925548554") return;

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

