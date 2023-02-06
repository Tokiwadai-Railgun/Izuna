const mongoose = require('mongoose');
const gameSchema = mongoose.Schema({
    pseudo : String,
    level : Number,
    accountId : String
})

const globalSchema = mongoose.Schema({
    userId: Number,
    leagueOfLegends : gameSchema,
    rocketLeague : gameSchema,
});


module.exports = mongoose.model('HazukumiGames', globalSchema);