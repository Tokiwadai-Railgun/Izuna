const { promisify } = require('util');
const { glob } = require('glob');
const pglob = promisify(glob);
const Logger = require('../logger');
const { Application, ApplicationCommandType, PermissionsBitField } = require('discord.js');

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
        // command.permissions.forEach(permission => { if (!permissionList.includes(permission)) return Logger.typo(`Command permission is not defined or does not exist, command not loaded (${permission}). ↓\nFile: ${commandFile} \n----------`); });

        Izuna.commands.set(command.name, command);
        Logger.command(command.name, ` : command successfully loaded`);
    });
};