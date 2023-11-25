const { isEmpty } = require('../utility');

module.exports = async (clash, parameters, command, prefix) => {
    if (isEmpty(parameters))
    return `For command _${command}_, you need to provide a tag, i.e: _${prefix}members #V2UJU28_`;

    try {
        const clanResponse = await clash.clanByTag(`#${parameters[0].replace('#', '')}`);
        const clanMembers = await Promise.all(clanResponse.memberList.map((obj, index) => {return(`${obj.role === `leader` ? `👑` : obj.role === `coLeader` ? `⭐` : obj.role === `admin` ? `💫` : `👤`} [${index+1}]  ${obj.name}  (${obj.tag})`);}).join(',').replace(/,/g, '\n').split());

        return (
            `🏰 *${clanResponse.name}* (${clanResponse.tag})\n\n` +
            `👥 *Members: ${clanResponse.members}*\n` +
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