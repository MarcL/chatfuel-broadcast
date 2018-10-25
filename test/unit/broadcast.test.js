// eslint-disable-next-line max-len
import sinon from 'sinon';
import { expect } from 'chai';
import requestPromise from 'request-promise';
import broadcast from '../../src/broadcast';

describe('Chatfuel.broadcast()', () => {
    let defaultOptions;
    let stubRequestPromisePost;

    const defaultBotId = 'defaultBotId';
    const defaultToken = 'defaultToken';
    const defaultUserId = 'defaultUserId';
    const defaultBlocklId = '42A5BB955DE61E47';
    const defaultBlockName = 'defaultBlockName';

    beforeEach(() => {
        defaultOptions = {
            botId: defaultBotId,
            blockId: defaultBlocklId,
            token: defaultToken,
            userId: defaultUserId,
            attributes: {},
        };

        stubRequestPromisePost = sinon.stub(requestPromise, 'post').resolves();
    });

    afterEach(() => {
        stubRequestPromisePost.restore();
    });

    describe('should throw expected error', () => {
        it('when no options are passed', () => {
            delete defaultOptions.botId;
            const wrapperFunction = () => broadcast();

            expect(wrapperFunction).to.throw('Expected options to be passed');
        });

        it('when botId is missing', () => {
            delete defaultOptions.botId;
            const wrapperFunction = () => broadcast(defaultOptions);

            expect(wrapperFunction).to.throw('Expected botId to be passed');
        });

        it('when token is missing', () => {
            delete defaultOptions.token;
            const wrapperFunction = () => broadcast(defaultOptions);

            expect(wrapperFunction).to.throw('Expected token to be passed');
        });

        it('when userId is missing', () => {
            delete defaultOptions.userId;
            const wrapperFunction = () => broadcast(defaultOptions);

            expect(wrapperFunction).to.throw('Expected userId to be passed');
        });

        it('when both blockId and blockName are missing', () => {
            const passedOptions = {
                botId: defaultBotId,
                token: defaultToken,
                userId: defaultUserId,
                attributes: {},
            };

            const wrapperFunction = () => broadcast(passedOptions);

            expect(wrapperFunction).to.throw('Expected either blockId or blockName to be passed');
        });

        it('when both blockId and blockName are passed', () => {
            const passedOptions = {
                botId: defaultBotId,
                token: defaultToken,
                userId: defaultUserId,
                blockId: defaultBlocklId,
                blockName: defaultBlockName,
                attributes: {},
            };

            const wrapperFunction = () => broadcast(passedOptions);

            expect(wrapperFunction).to.throw('Expected blockId or blockName to be passed but not both');
        });

        it("when blockId is passed but isn't a hex value", () => {
            const passedOptions = Object.assign({}, defaultOptions, {
                blockId: 'NotAHexValue',
            });

            const wrapperFunction = () => broadcast(passedOptions);

            expect(wrapperFunction).to.throw('Expected blockId to contain a hexadecimal value');
        });
    });

    it('should call expected endpoint when blockId is passed', () => {
        const chatfuelEndpointUrl = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const expectedUri = `${chatfuelEndpointUrl}?chatfuel_token=${defaultToken}&chatfuel_block_id=${defaultBlocklId}`;

        return broadcast(defaultOptions).then(() => {
            expect(stubRequestPromisePost.getCall(0).args[0].uri).to.equal(expectedUri);
        });
    });

    it('should call expected endpoint when blockName is passed', () => {
        const chatfuelEndpointUrl = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const expectedUri = `${chatfuelEndpointUrl}?chatfuel_token=${defaultToken}&chatfuel_block_name=${defaultBlockName}`;

        const passedOptions = {
            botId: defaultBotId,
            token: defaultToken,
            userId: defaultUserId,
            blockName: defaultBlockName,
            attributes: {},
        };

        return broadcast(passedOptions).then(() => {
            expect(stubRequestPromisePost.getCall(0).args[0].uri).to.equal(expectedUri);
        });
    });

    it('should call expected endpoint with URL encoded blockName', () => {
        const givenBlockName = 'Given Block Name';
        const chatfuelEndpointUrl = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const expectedUri = `${chatfuelEndpointUrl}?chatfuel_token=${defaultToken}&chatfuel_block_name=${encodeURIComponent(givenBlockName)}`;

        const passedOptions = {
            botId: defaultBotId,
            token: defaultToken,
            userId: defaultUserId,
            blockName: givenBlockName,
            attributes: {},
        };

        return broadcast(passedOptions).then(() => {
            expect(stubRequestPromisePost.getCall(0).args[0].uri).to.equal(expectedUri);
        });
    });

    it('should set expected request headers', () => {
        const expectedRequestHeaders = {
            'Content-Type': 'application/json',
        };

        return broadcast(defaultOptions).then(() => {
            // eslint-disable-next-line max-len
            expect(stubRequestPromisePost.getCall(0).args[0].headers).to.deep.equal(expectedRequestHeaders);
        });
    });

    it('should expect a JSON response', () => {
        broadcast(defaultOptions);

        return broadcast(defaultOptions).then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(stubRequestPromisePost.getCall(0).args[0].json).to.be.true;
        });
    });

    it('should append passed attributes as endpoint query parameters', () => {
        const givenAttributes = {
            fakeattribute1: 'fakeAttribute1',
            fakeattribute2: 'fakeAttribute2',
        };
        const options = Object.assign({}, defaultOptions, { attributes: givenAttributes });
        const fakeAttributeQueryParameters =
            'fakeattribute1=fakeAttribute1&fakeattribute2=fakeAttribute2';

        const chatfuelEndpointUrl = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const queryParameters = `?chatfuel_token=${defaultToken}&chatfuel_block_id=${defaultBlocklId}&${fakeAttributeQueryParameters}`;
        const expectedUri = `${chatfuelEndpointUrl}${queryParameters}`;

        return broadcast(options).then(() => {
            expect(stubRequestPromisePost.getCall(0).args[0].uri).to.equal(expectedUri);
        });
    });
});
