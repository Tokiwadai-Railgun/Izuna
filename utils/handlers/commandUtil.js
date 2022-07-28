const { promisify } = require('util');
const { glob } = require('glob');
const pglob = promisify(glob);
const Logger = require('../logger');
const { Application, ApplicationCommandType } = require('discord.js');

module.exports = async (Izuna) => {
    (await pglob(`${process.cwd()}/commands/*/*.js`)).map(async commandFile => {
        const command = require(commandFile);

        // warns
        if (!command.name ) return Logger.warn(`Command name is not defined, command not loaded. ↓\n File: ${commandFile} \n----------`);
        if (!command.description && command.type != ApplicationCommandType.User) return Logger.warn(`Command description is not defined, command not loaded. ↓\nFile: ${commandFile} \n----------`);
        if (!command.category) return Logger.warn(`Command category is not defined, command not loaded. ↓\nFile: ${commandFile} \n----------`);
        if (!command.permissions) return Logger.warn(`Command permissions is not defined, command not loaded. ↓\nFile: ${commandFile} \n----------`);
        if (!command.aliases && command.type != ApplicationCommandType.User) return Logger.warn(`Command aliases is not defined, command not loaded. ↓\nFile: ${commandFile} \n----------`);

        // typos
        command.permissions.forEach(permission => { if (!permissionList.includes(permission)) return Logger.typo(`Command permission is not defined or does not exist, command not loaded (${permission}). ↓\nFile: ${commandFile} \n----------`); });

        Izuna.commands.set(command.name, command);
        Logger.command(command.name, ` : command successfully loaded`);
    });
};

const permissionList = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS_AND_STICKERS', 'USE_APPLICATION_COMMANDS', 'REQUEST_TO_SPEAK', 'MANAGE_EVENTS', 'MANAGE_THREADS', 'USE_PUBLIC_THREADS', 'CREATE_PUBLIC_THREADS', 'USE_PRIVATE_THREADS', 'CREATE_PRIVATE_THREADS', 'USE_EXTERNAL_STICKERS', 'SEND_MESSAGES_IN_THREADS', 'START_EMBEDDED_ACTIVITIES', 'MODERATE_MEMBERS'];
