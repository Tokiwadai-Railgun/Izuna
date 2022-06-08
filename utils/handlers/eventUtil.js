const { promisify } = require('util');
const { glob } = require('glob');
const Logger = require('../logger');
const pglob = promisify(glob);

module.exports = async Izuna => {
    (await pglob(`${process.cwd()}/events/*/*.js`)).map(async eventFile => {
        const event = require(eventFile);

        if (!eventList.includes(event.name) || ! event.name) {
            return Logger.warn(`Event (${event.name}) name is not defined or does not exist in the event list, event not loaded (${event}). ↓\nFile: ${eventFile} \n----------`);
        }

        
        if (event.once) {
            Izuna.once(event.name, (...args) => event.execute(Izuna, ...args));
        } else {
            Izuna.on(event.name, (...args) => event.execute(Izuna, ...args));
        }

        Logger.event(event.name, ` : event successfully loaded`);
    
    });
}

const eventList = [ 'apiRequest', 'apiResponse', 'applicationCommandCreateD', 'applicationCommandDeleteD', 'applicationCommandUpdateD', 'channelCreate', 'channelDelete', 'channelPinsUpdate', 'channelUpdate', 'debug', 'emojiCreate', 'emojiDelete', 'emojiUpdate', 'error', 'guildBanAdd', 'guildBanRemove', 'guildCreate', 'guildDelete', 'guildIntegrationsUpdate', 'guildMemberAdd', 'guildMemberAvailable', 'guildMemberRemove', 'guildMembersChunk', 'guildMemberUpdate', 'guildScheduledEventCreate', 'guildScheduledEventDelete', 'guildScheduledEventUpdate', 'guildScheduledEventUserAdd', 'guildScheduledEventUserRemove', 'guildUnavailable', 'guildUpdate', 'interactionD', 'interactionCreate', 'invalidated', 'invalidRequestWarning', 'inviteCreate', 'inviteDelete', 'messageD', 'messageCreate', 'messageDelete', 'messageDeleteBulk', 'messageReactionAdd', 'messageReactionRemove', 'messageReactionRemoveAll', 'messageReactionRemoveEmoji', 'messageUpdate', 'presenceUpdate', 'rateLimit', 'ready', 'roleCreate', 'roleDelete', 'roleUpdate', 'shardDisconnect', 'shardError', 'shardReady', 'shardReconnecting', 'shardResume', 'stageInstanceCreate', 'stageInstanceDelete', 'stageInstanceUpdate', 'stickerCreate', 'stickerDelete', 'stickerUpdate', 'threadCreate', 'threadDelete', 'threadListSync', 'threadMembersUpdate', 'threadMemberUpdate', 'threadUpdate', 'typingStart', 'userUpdate', 'voiceStateUpdate', 'warn', 'webhookUpdate', ]
