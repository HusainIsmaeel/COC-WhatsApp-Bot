const { isEmpty } = require('../utility');

module.exports = async (clash, parameters, command, prefix) => {
    if (isEmpty(parameters))
    return `For command _${command}_, you need to provide a tag, i.e: _${prefix}townhall #V2UJU28_`;

    try {
        const clanResponse = await clash.clanByTag(`#${parameters[0].replace('#', '')}`);
        const clanMembers = await Promise.all(clanResponse.memberList.map(async clanMember => await clash.playerByTag(clanMember.tag)));
        const townHalls = clanMembers.map(memberDetails => memberDetails.townHallLevel);
        const uniqueTownHalls = [...new Set(townHalls)].sort((a, b) => b - a);
        const townHallCount = uniqueTownHalls.map(th => `*🏠 TownHall ${th}:* ${townHalls.filter(townhall => townhall === th).length}\n`);
        const averageTownhall = townHalls.reduce((totalValue, itemValue) => totalValue + itemValue, 0) / townHalls.length;

        return (
            `🏰 *${clanResponse.name}* (${clanResponse.tag})\n` +
            `🔝 *Clan Level:* ${clanResponse.clanLevel}\n` +
            `🥇 *Clan War League:* ${clanResponse.warLeague.name}\n` +
            `🥇 *Clan Capital League:* ${clanResponse.capitalLeague.name}\n\n` +
            `${townHallCount.join('')}\n` +

            `👥 *Members:* ${clanResponse.members}\n` +
            `➗ *Average TH's:* ${Math.ceil(averageTownhall)}`
        );
    } catch (error) {
        let errorMessage;

        switch (error.statusCode) {
            case 404:
                errorMessage = `Clan ${parameters[0]} not found, please try another tag.`;
                break;
            default:
                errorMessage = `Something went wrong with ${command} request, please double check inputs.`;
                console.log(error);
        }

        return errorMessage;
    }
}