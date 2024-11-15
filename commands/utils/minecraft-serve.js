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
                { name: "IP", value: "``amour.la-banquise.fr``", inline: true },
                { name: "Modpack", value: "[Cliquez ici](https://cdn.discordapp.com/attachments/944595214960574474/1260196074769874984/Amour_-_Client.zip?ex=668e708d&is=668d1f0d&hm=8fc28f2295098a204281ab7685b0784b59211e92b806c8b734eb6e18dd053d65&)", inline: true }
            ])
            .setColor("#7F0856")
            .setFooter({text: "Bon jeu !"});

        // Send the embed
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}
