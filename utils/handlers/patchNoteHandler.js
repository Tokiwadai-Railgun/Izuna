const Logger = require('../logger');

module.exports = async (Izuna, message) => {
    // On envoie un message dans le channel de Hazukumi
    const patchChannel = Izuna.channels.cache.get(733580968534868090); //733580968534868090

    patchChannel.send(message);
};
