const { EmbedBuilder } = require("discord.js");
const dotenv = require("dotenv"); dotenv.config();
const schedule = require('node-schedule');

// Schedule a DM every hour
module.exports = async(Izuna) => {
  schedule.scheduleJob('0 0 * * * *', async () => {
    // Find me
    const user = Izuna.users.cache.get("330026848052314112");

    const now = new Date
    const request = new Request(`https://api.wanikani.com/v2/assignments?available_before=${now.toISOString()}`, {
      method: 'GET',
      headers: new Headers({ Authorization: `Bearer ${process.env.WANIKANI_API_TOKEN}` })
    })
    // Here we have all the review available now
    const reviews = await fetch(request).then(res => res.json())
    if (reviews.data.length === 0) return;

    // sélectionner un kanji aléatoire parmis les cours actuels
    const randomKanji = reviews.data[Math.floor(Math.random() * reviews.data.length)]


    // Querying the subject
    const requestKanji = new Request(`https://api.wanikani.com/v2/subjects/${randomKanji.data.subject_id}`, {
      method: 'GET',
      headers: new Headers({ Authorization: `Bearer ${process.env.WANIKANI_API_TOKEN}` })
    })

    const kanji = await fetch(requestKanji).then(res => res.json())
    // Create embed
    console.log(kanji.data)
    const embed = new EmbedBuilder()
      .setTitle('Random Kanji')
      .setDescription(`À quoi correspond ${kanji.data.characters}`)
      .setColor('#7F0856')
      .setTimestamp()
      .setFooter({text:'Izuna - Using WaniKani API'})
    user.send({ embeds: [embed]})
  });
}

