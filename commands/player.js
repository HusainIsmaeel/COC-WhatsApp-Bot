const { isEmpty } = require('../utility');

module.exports = async (clash, parameters, command, prefix) => {
    if (isEmpty(parameters))
    return `For command _${command}_, you need to provide a tag, i.e: _${prefix}player #QLRV8LVL2_`;

    try {
        const playerResponse = await clash.playerByTag(`#${parameters[0].replace('#', '')}`);

        return (
            `👾 *Player Details:*\n\n` +
            `👤 _${playerResponse.name} (${playerResponse.tag})_\n\n` +
            `🏠 *Townhall Level:* ${playerResponse.townHallLevel}\n` +

            (
                isEmpty(playerResponse.builderHallLevel)
                ? ``
                : `🏚 *Builder Hall Level:* ${playerResponse.builderHallLevel}\n`
            ) +

            `🔝 *XP Level:* ${playerResponse.expLevel}\n\n` +

            (
                isEmpty(playerResponse.clan)
                ? ``
                :
                `🏰 *Clan Name:* ${playerResponse.clan.name}\n` +
                `🔝 *Clan Level:* ${playerResponse.clan.clanLevel}\n` +
                `${playerResponse.role === `leader` ? `👑` : playerResponse.role === `coLeader` ? `⭐` : playerResponse.role === `admin` ? `💫` : `👤`} *Clan Role:* ${playerResponse.role === `leader` ? `Leader قائد` : playerResponse.role === `coLeader` ? `Co-Leader قائد مساعد` : playerResponse.role === `admin` ? `Elder عضو مميز` : `Member عضو`}\n\n`
            ) +

            (
                isEmpty(playerResponse.league)
                ? ``
                : `📛 *League:* ${playerResponse.league.name}\n`
            ) +

            (
                isEmpty(playerResponse.clan)
                ? ``
                :
                `🏆 *Trophies:* ${playerResponse.trophies}\n` +
                `🏆 *Versus Trophies:* ${playerResponse.versusTrophies}\n` +
                `💪 *Versus Battle Wins:* ${playerResponse.versusBattleWins}\n` +
                `⚔ *Attack Wins:* ${playerResponse.attackWins}\n` +
                `🛡 *Defense Wins:* ${playerResponse.defenseWins}\n` +
                `🫳 *Donations:* ${playerResponse.donations}\n` +
                `🫴 *Donations Received:* ${playerResponse.donationsReceived}\n`
            )

        );
    } catch (error) {
        let errorMessage;

        switch (error.statusCode) {
            case 404:
                errorMessage = `Player ${parameters[0]} not found, please try another tag.`;
                break;
            default:
                errorMessage = `Something went wrong with ${command} request, please double check inputs.`;
                console.log(error);
        }

        return errorMessage;
    }
}