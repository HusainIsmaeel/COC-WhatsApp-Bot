exports.getCommandParameters = (body) => {
    const prefix = body[0].toUpperCase(); // prefix = !
    const query = body.substring(1).split(' '); // Hel lo = ['Hel', 'lo']
    const command = query[0].toUpperCase(); // 'Hel'
    const parameters = query.slice(1); // ['lo']

    return {
        prefix,
        query,
        command,
        parameters
    };
};

exports.isEmpty = value =>
value === undefined ||
value === null ||
(typeof value === 'object' && Object.keys(value).length === 0) ||
(typeof value === 'string' && value.trim().length === 0)