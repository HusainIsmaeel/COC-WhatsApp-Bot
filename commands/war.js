const { isEmpty } = require('../utility');

module.exports = async (clash, parameters, command, prefix) => {
    if (isEmpty(parameters))
    return `For command _${command}_, you need to provide a tag, i.e: _${prefix}war #V2UJU28_`;

    try {
        const clanResponse = await clash.clanCurrentWarByTag(`#${parameters[0].replace('#', '')}`);
        const clanMembers = await Promise.all(clanResponse
            .clan
            .members
            .sort((a, b) => a.mapPosition - b.mapPosition)
            .map((obj, index) => {
                return(
                    `[${obj.mapPosition}]  ${obj.name} | Th${obj.townhallLevel} ` +
                    (
                        isEmpty(obj.attacks) ? ``
                        :
                        isEmpty(obj.attacks[1]) ? `| ⭐ ${obj.attacks[0].stars} ⚔ 1`
                        :
                        `| ⭐ ${obj.attacks[0].stars+obj.attacks[1].stars} ⚔ 2`
                    )
                    );}).join(',').replace(/,/g, '\n').split());

        return (
            `🏰 *${clanResponse.clan.name} 🆚 ${clanResponse.opponent.name}*\n\n` +

            `⚔ *Attacks:* ${clanResponse.clan.attacks} 🆚 ${clanResponse.opponent.attacks}\n` +
            `⭐ *Stars:* ${clanResponse.clan.stars} 🆚 ${clanResponse.opponent.stars}\n\n` +

            `📃 *War Log:*\n` +
            `${clanMembers}\n`
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