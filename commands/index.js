const config = require('../config');
const { PLAYER, HELP, TOWN_HALL, TOWN_HALL_SHORT, MEMBERS, WAR } = require('./types');
const { getCommandParameters } = require('../utility');
const player = require('./player');
const townhall = require('./townhall');
const members = require('./members');
const war = require('./war');

module.exports = async (whatsapp, message, clash) => {
    const { prefix, query, command, parameters } = getCommandParameters(message.body);

    if (!(prefix === config.prefix)) return;

    const helpMessage =
    `*Bot Commands*\n` +
    `   Prefix: ${prefix}\n\n` +
    `_@ Player Commands:_\n` +
    `   ${config.prefix}player #TAG\n\n` +
    `_@ Clan Commands:_\n` +
    `   ${config.prefix}war #TAG\n` +
    `   ${config.prefix}members #TAG\n` +
    `   ${config.prefix}townhall #TAG\n`
    ;

    let replyMessage = '';

    try {
        switch ( command ) {
            case PLAYER:
                replyMessage = await player(clash, parameters, command, config.prefix);
                break;
            case TOWN_HALL:
            case TOWN_HALL_SHORT:
                replyMessage = await townhall(clash, parameters, command, config.prefix);
                break;
            case MEMBERS:
                replyMessage = await members(clash, parameters, command, config.prefix);
                break;
            case WAR:
                replyMessage = await war(clash, parameters, command, config.prefix);
                break;
            case HELP:
                replyMessage = helpMessage;
                break;
            default:
                replyMessage = `Command: _'${command}'_ does not exist, please see commands below:\n\n` + `${helpMessage}`;
        }
        await whatsapp.sendMessage(message.from, replyMessage);
    } catch (error) {
        await whatsapp.sendMessage(message.from, 'Something went wrong!');
        console.log(error);
    }
}