const { promisify } = require('util');
const { glob } = require('glob');
const pglob = promisify(glob);
const Logger = require('../logger');

module.exports = async (Izuna) => {
    (await pglob(`${process.cwd()}/buttons/*/*.js`)).map(async (buttonFile) => {
        const button = require(buttonFile);

        // warns
        if (!button.name ) return Logger.warn(`Button name is not defined, button not loaded. ↓\n File: ${buttonFile} \n----------`);


        Izuna.buttons.set(button.name, button);
    });
};
