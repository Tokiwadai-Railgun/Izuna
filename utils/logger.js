const chalk = require('chalk');
const dayjs = require('dayjs');

const format = '----------\n{tstamp} {tag} {txt}\n';
const format2 = "[ {name} ] {message}\n";

function error(content) {
    write(content, 'black', 'bgRed', "ERROR", true);
}

function warn(content) {
    write(content, 'black', 'bgYellow', "WARN", false);
}

function typo(content) {
    write(content, 'black', 'bgCyan', "TYPO", false);
}

function command(name, message) {
    write2(name, message, 'magenta');
}

function event(name, message) {
    write2(name, message, 'blue');
}

function write2(name, message, nameColor) {
    const item = format2
        .replace('{name}', chalk[nameColor](name))
        .replace('{message}', chalk.white(message));
    
    console.log(item);
}

function write(content, tagColor, bgTagColor, tag, error = false){
    const tstamp = `[${dayjs().format('DD/MM - HH:mm:ss')}]`;
    const logTag = `[${tag}]`;
    // stderr = console.error | stdout = console.log
    const stream = error ? process.stderr : process.stdout;

    const item = format
        .replace('{tstamp}', chalk.gray(tstamp))
        .replace('{tag}', chalk[bgTagColor][tagColor](logTag))
        .replace('{txt}', chalk.white(content));

    stream.write(item);
}


module.exports = { error, warn, typo, command, event };