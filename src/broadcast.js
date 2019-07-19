import isHex from 'is-hex';
import requestPromise from 'request-promise';
import url from 'url';
import validateFacebookTags from './validateFacebookTags';

// http://docs.chatfuel.com/broadcasting/broadcasting-documentation/broadcasting-api

const CHATFUEL_BASE_URL = 'https://api.chatfuel.com';

const validateExpectedParameters = (options) => {
    const expectedParameters = ['botId', 'token', 'userId', 'messageTag'];

    if (!options) {
        throw new Error('Expected options to be passed');
    }

    expectedParameters.forEach((parameter) => {
        if (!options[parameter]) {
            throw new Error(`Expected ${parameter} to be passed`);
        }
    });
};

const getBlockIdOrNameFromOptions = (options) => {
    const { blockId, blockName } = options;

    if (!blockName && !blockId) {
        throw new Error('Expected either blockId or blockName to be passed');
    }

    if (blockName && blockId) {
        throw new Error('Expected blockId or blockName to be passed but not both');
    }

    if (blockId) {
        if (!isHex(blockId)) {
            throw new Error('Expected blockId to contain a hexadecimal value');
        }

        return { chatfuel_block_id: blockId };
    }

    return { chatfuel_block_name: blockName };
};

const createChatfuelBroadcastUrl = (botId, userId) => `${CHATFUEL_BASE_URL}/bots/${botId}/users/${userId}/send`;

const broadcast = (options) => {
    validateExpectedParameters(options);

    const {
        botId, token, userId, attributes, messageTag,
    } = options;

    const chatfuelRedirectBlock = getBlockIdOrNameFromOptions(options);

    if (!validateFacebookTags(messageTag)) {
        throw new Error(`Invalid Facebook message tag '${messageTag}'`);
    }

    const chatfuelBroadcastUrl = createChatfuelBroadcastUrl(botId, userId);

    const query = Object.assign(
        {},
        {
            chatfuel_token: token,
            chatfuel_message_tag: messageTag,
        },
        chatfuelRedirectBlock,
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
