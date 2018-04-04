import requestPromise from 'request-promise';
import url from 'url';

// http://docs.chatfuel.com/broadcasting/broadcasting-documentation/broadcasting-api

const CHATFUEL_BASE_URL = 'https://api.chatfuel.com';

const validateExpectedParameters = (options) => {
    const expectedParameters = [
        'botId', 'blockId', 'token', 'userId',
    ];

    if (!options) {
        throw new Error('Expected options to be passed');
    }

    expectedParameters.forEach((parameter) => {
        if (!options[parameter]) {
            throw new Error(`Expected ${parameter} to be passed`);
        }
    });
};

const createChatfuelBroadcastUrl = (botId, userId) => `${CHATFUEL_BASE_URL}/bots/${botId}/users/${userId}/send`;

const broadcast = (options) => {
    validateExpectedParameters(options);

    const {
        botId, blockId, token, userId, attributes,
    } = options;

    const chatfuelBroadcastUrl = createChatfuelBroadcastUrl(botId, userId);

    const query = Object.assign(
        {},
        {
            chatfuel_token: token,
            chatfuel_block_name: blockId,
        },
        attributes,
    );

    const chatfuelApiUrl = url.format({
        pathname: chatfuelBroadcastUrl,
        query,
    });

    const requestOptions = {
        uri: chatfuelApiUrl,
        headers: {
            'Content-Type': 'application/json',
        },
        json: true,
    };

    return requestPromise.post(requestOptions);
};

export default broadcast;
