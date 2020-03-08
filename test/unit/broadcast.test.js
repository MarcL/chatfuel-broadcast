import httpClient from '../../src/httpClient';
import broadcast from '../../src/broadcast';

jest.mock('../../src/httpClient');

describe('Chatfuel.broadcast()', () => {
    let defaultOptions;
    let stubHttpClient;

    const defaultBotId = 'defaultBotId';
    const defaultToken = 'defaultToken';
    const defaultUserId = 'defaultUserId';
    const defaultBlocklId = '42A5BB955DE61E47';
    const defaultBlockName = 'defaultBlockName';
    const defaultMessageTag = 'CONFIRMED_EVENT_UPDATE';

    const defaultSuccessMessage = 'defaultSuccessMessage';
    const defaultSuccessResponse = {
        data: {
            result: defaultSuccessMessage,
            success: true,
        },
    };

    beforeEach(() => {
        defaultOptions = {
            botId: defaultBotId,
            blockId: defaultBlocklId,
            token: defaultToken,
            userId: defaultUserId,
            messageTag: defaultMessageTag,
            attributes: {},
        };

        stubHttpClient = Promise.resolve(defaultSuccessResponse);
        httpClient.mockReturnValue(stubHttpClient);
    });

    describe('should throw expected error', () => {
        it('when no options are passed', () => {
            delete defaultOptions.botId;
            const wrapperFunction = () => broadcast();

            expect(wrapperFunction).toThrowError('Expected options to be passed');
        });

        it('when botId is missing', () => {
            delete defaultOptions.botId;
            const wrapperFunction = () => broadcast(defaultOptions);

            expect(wrapperFunction).toThrowError('Expected botId to be passed');
        });

        it('when token is missing', () => {
            delete defaultOptions.token;
            const wrapperFunction = () => broadcast(defaultOptions);

            expect(wrapperFunction).toThrowError('Expected token to be passed');
        });

        it('when userId is missing', () => {
            delete defaultOptions.userId;
            const wrapperFunction = () => broadcast(defaultOptions);

            expect(wrapperFunction).toThrowError('Expected userId to be passed');
        });

        it('when messageTag is missing', () => {
            delete defaultOptions.messageTag;
            const wrapperFunction = () => broadcast(defaultOptions);

            expect(wrapperFunction).toThrowError('Expected messageTag to be passed');
        });

        it('when both blockId and blockName are missing', () => {
            const passedOptions = {
                botId: defaultBotId,
                token: defaultToken,
                userId: defaultUserId,
                messageTag: defaultMessageTag,
                attributes: {},
            };

            const wrapperFunction = () => broadcast(passedOptions);

            expect(wrapperFunction).toThrowError('Expected either blockId or blockName to be passed');
        });

        it('when both blockId and blockName are passed', () => {
            const passedOptions = {
                botId: defaultBotId,
                token: defaultToken,
                userId: defaultUserId,
                blockId: defaultBlocklId,
                blockName: defaultBlockName,
                messageTag: defaultMessageTag,
                attributes: {},
            };

            const wrapperFunction = () => broadcast(passedOptions);

            expect(wrapperFunction).toThrowError('Expected blockId or blockName to be passed but not both');
        });

        it("when blockId is passed but isn't a hex value", () => {
            const passedOptions = { ...defaultOptions, blockId: 'NotAHexValue' };

            const wrapperFunction = () => broadcast(passedOptions);

            expect(wrapperFunction).toThrowError('Expected blockId to contain a hexadecimal value');
        });

        it('when messageTag is invalid', () => {
            const invalidMessageTag = 'invalidMessageTag';
            const passedOptions = { ...defaultOptions, messageTag: invalidMessageTag };

            const wrapperFunction = () => broadcast(passedOptions);

            expect(wrapperFunction).toThrowError(`Invalid Facebook or Chatfuel message tag '${invalidMessageTag}'`);
        });
    });

    it('should make expected HTTP request when blockId is passed', () => {
        const chatfuelEndpointUrl = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const expectedUrl = `${chatfuelEndpointUrl}?chatfuel_token=${defaultToken}&chatfuel_message_tag=${defaultMessageTag}&chatfuel_block_id=${defaultBlocklId}`;

        const expectedOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            url: expectedUrl,
        };

        return broadcast(defaultOptions)
            .then(() => {
                expect(httpClient).toHaveBeenCalledWith(expectedOptions);
            });
    });

    it('should make expected HTTP request when blockName is passed', () => {
        const chatfuelEndpointUrl = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const expectedUrl = `${chatfuelEndpointUrl}?chatfuel_token=${defaultToken}&chatfuel_message_tag=${defaultMessageTag}&chatfuel_block_name=${defaultBlockName}`;

        const expectedOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            url: expectedUrl,
        };

        const passedOptions = {
            botId: defaultBotId,
            token: defaultToken,
            userId: defaultUserId,
            blockName: defaultBlockName,
            messageTag: defaultMessageTag,
            attributes: {},
        };

        return broadcast(passedOptions).then(() => {
            expect(httpClient).toHaveBeenCalledWith(expectedOptions);
        });
    });

    it('should make expected HTTP request with URL encoded blockName', () => {
        const givenBlockName = 'Given Block Name';
        const chatfuelEndpointUrl = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const expectedUrl = `${chatfuelEndpointUrl}?chatfuel_token=${defaultToken}&chatfuel_message_tag=${defaultMessageTag}&chatfuel_block_name=${encodeURIComponent(givenBlockName)}`;

        const expectedOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            url: expectedUrl,
        };

        const passedOptions = {
            botId: defaultBotId,
            token: defaultToken,
            userId: defaultUserId,
            blockName: givenBlockName,
            messageTag: defaultMessageTag,
            attributes: {},
        };

        return broadcast(passedOptions).then(() => {
            expect(httpClient).toHaveBeenCalledWith(expectedOptions);
        });
    });

    it('should append passed attributes as endpoint query parameters', () => {
        const givenAttributes = {
            fakeattribute1: 'fakeAttribute1',
            fakeattribute2: 'fakeAttribute2',
        };
        const options = { ...defaultOptions, attributes: givenAttributes };
        const fakeAttributeQueryParameters = 'fakeattribute1=fakeAttribute1&fakeattribute2=fakeAttribute2';

        const chatfuelEndpointUrl = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const queryParameters = `?chatfuel_token=${defaultToken}&chatfuel_message_tag=${defaultMessageTag}&chatfuel_block_id=${defaultBlocklId}&${fakeAttributeQueryParameters}`;
        const expectedUrl = `${chatfuelEndpointUrl}${queryParameters}`;

        const expectedOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            url: expectedUrl,
        };

        return broadcast(options).then(() => {
            expect(httpClient).toHaveBeenCalledWith(expectedOptions);
        });
    });

    it('should return expected response when request is successful', () => (
        broadcast(defaultOptions)
            .then((data) => {
                expect(data).toEqual(defaultSuccessMessage);
            })
    ));

    it('should throw expected response when request fails', () => {
        const mockErrorMessage = 'Mock error message';
        const apiError = new Error(mockErrorMessage);
        apiError.response = {
            data: {
                result: mockErrorMessage,
                success: false,
            },
        };

        const httpClientWithError = Promise.reject(apiError);
        httpClient.mockReturnValue(httpClientWithError);

        return broadcast(defaultOptions)
            .catch((error) => {
                expect(error.toString()).toEqual(error.toString());
            });
    });
});
