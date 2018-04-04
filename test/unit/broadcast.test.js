import sinon from 'sinon';
import { expect } from 'chai';
import requestPromise from 'request-promise';
import broadcast from '../../src/broadcast';

describe('Chatfuel.broadcast()', () => {
    let defaultOptions;
    let stubRequestPromisePost;

    const defaultBotId = 'defaultBotId';
    const defaultBlocklId = 'defaultBlockId';
    const defaultToken = 'defaultToken';
    const defaultUserId = 'defaultUserId';

    beforeEach(() => {
        defaultOptions = {
            botId: defaultBotId,
            blockId: defaultBlocklId,
            token: defaultToken,
            userId: defaultUserId,
            attributes: {},
        };

        stubRequestPromisePost = sinon.stub(requestPromise, 'post');
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

        it('when blockId is missing', () => {
            delete defaultOptions.blockId;
            const wrapperFunction = () => broadcast(defaultOptions);

            expect(wrapperFunction).to.throw('Expected blockId to be passed');
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
    });

    it('should call expected endpoint', () => {
        const chatfuelEndpointUrl = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const expectedUri = `${chatfuelEndpointUrl}?chatfuel_token=${defaultToken}&chatfuel_block_name=${defaultBlocklId}`;

        broadcast(defaultOptions);

        expect(stubRequestPromisePost.getCall(0).args[0].uri).to.equal(expectedUri);
    });

    it('should set expected request headers', () => {
        const expectedRequestHeaders = {
            'Content-Type': 'application/json',
        };

        broadcast(defaultOptions);

        expect(stubRequestPromisePost.getCall(0).args[0].headers)
            .to.deep.equal(expectedRequestHeaders);
    });

    it('should expect a JSON response', () => {
        broadcast(defaultOptions);

        // eslint-disable-next-line no-unused-expressions
        expect(stubRequestPromisePost.getCall(0).args[0].json)
            .to.be.true;
    });

    it('should append passed attributes as endpoint query parameters', () => {
        const givenAttributes = {
            fakeattribute1: 'fakeAttribute1',
            fakeattribute2: 'fakeAttribute2',
        };
        const options = Object.assign({}, defaultOptions, { attributes: givenAttributes });
        const fakeAttributeQueryParameters = 'fakeattribute1=fakeAttribute1&fakeattribute2=fakeAttribute2';

        const chatfuelEndpointUrl = `https://api.chatfuel.com/bots/${defaultBotId}/users/${defaultUserId}/send`;
        const expectedUri = `${chatfuelEndpointUrl}?chatfuel_token=${defaultToken}&chatfuel_block_name=${defaultBlocklId}&${fakeAttributeQueryParameters}`;

        broadcast(options);

        expect(stubRequestPromisePost.getCall(0).args[0].uri).to.equal(expectedUri);
    });
});
