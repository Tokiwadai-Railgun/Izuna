const { promisify } = require('util');
const { glob } = require('glob');
const pglob = promisify(glob);
const Logger = require('../logger');

module.exports = async (Izuna) => {
    (await pglob(`${process.cwd()}/selects/*/*.js`)).map(async (selectMenuFile) => {
        const selectMenu = require(selectMenuFile);

        // warns
        if (!selectMenu.name ) return Logger.warn(`SelectMenu name is not defined, not loaded. ↓\n File: ${selectMenuFile} \n----------`);


        Izuna.selects.set(selectMenu.name, selectMenu);
    });
};
