const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "minecraft-server",
    aliases: ["latency", "latence"],
    category: "utils",
    usage: "ping",
    permissions :[ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages ],
    description: "Pong !",
    run: async (Izuna, message, args) => {
        message.reply("Uniquement utilisable en interaction !")
    },
    runInteraction: async (Izuna, interaction) => {
        if (interaction.guild.id !== "1252336697002430475") return interaction.reply("Cette commande n'est pas disponible sur ce serveur !");

        // Generate the embed containing the server id and modpack link
        const embed = new EmbedBuilder()
            .setTitle("Serveur Minecraft")
            .setDescription("Voici les informations pour rejoindre le serveur Minecraft.")
            .addFields([
                { name: "IP", value: "play.izuna.fr", inline: true },
                { name: "Modpack", value: "[Cliquez ici](https://cdn.discordapp.com/attachments/944595214960574474/1258548785638805524/Amour_-_Client.zip?ex=66887265&is=668720e5&hm=a09b324dba5cf6fcc71fb2484f39176db80dfce4210de6093297f3a24be15c92&)", inline: true }
            ])
            .setColor("#7F0856")
            .setFooter({text: "Bon jeu !"});

        // Send the embed
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}