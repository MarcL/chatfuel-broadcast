/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import validateFacebookTags from '../../src/validateFacebookTags';

describe('Validate Facebook tags', () => {
    it('should be false if no tag given', () => {
        expect(validateFacebookTags()).to.be.false;
    });

    it('should be false if invalid tag given', () => {
        expect(validateFacebookTags('invalid_tag')).to.be.false;
    });

    it('should be false if valid tag has incorrect case', () => {
        expect(validateFacebookTags('update')).to.be.false;
    });

    [
        'UPDATE',
        'CONFIRMED_EVENT_UPDATE',
        'POST_PURCHASE_UPDATE',
        'ACCOUNT_UPDATE',
        'HUMAN_AGENT',
    ].forEach((tag) => {
        it(`should be true if valid tag '${tag}' given`, () => {
            expect(validateFacebookTags(tag)).to.be.true;
        });
    });
});
