const broadcast = require('../lib/broadcast');

// Pass through botId, token and user id as environment variables
const {
    BOT_ID: botId,
    TOKEN: token,
    USER_ID: userId,
} = process.env;

const broadcastOptions = {
    botId,
    token,
    userId,
    messageTag: 'UPDATE',

    blockName: 'time.test',
};

// Try and send more than 25 requests in a second
for (let i = 0; i < 30; i += 1) {
    broadcast(broadcastOptions)
        .then((data) => console.log(data))
        .catch((data) => console.log(data));
}
