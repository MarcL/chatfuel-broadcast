/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import validFacebookTags from '../../src/validFacebookTags';

describe('validFacebookTags()', () => {
    it('should be false if no tag given', () => {
        expect(validFacebookTags()).to.be.false;
    });

    it('should be false if invalid tag given', () => {
        expect(validFacebookTags('invalid_tag')).to.be.false;
    });

    it('should be false if valid tag has incorrect case', () => {
        expect(validFacebookTags('business_productivity')).to.be.false;
    });

    [
        'BUSINESS_PRODUCTIVITY',
        'COMMUNITY_ALERT',
        'CONFIRMED_EVENT_REMINDER',
        'NON_PROMOTIONAL_SUBSCRIPTION',
        'PAIRING_UPDATE',
        'APPLICATION_UPDATE',
        'ACCOUNT_UPDATE',
        'PAYMENT_UPDATE',
        'PERSONAL_FINANCE_UPDATE',
        'SHIPPING_UPDATE',
        'RESERVATION_UPDATE',
        'ISSUE_RESOLUTION',
        'APPOINTMENT_UPDATE',
        'GAME_EVENT',
        'TRANSPORTATION_UPDATE',
        'FEATURE_FUNCTIONALITY_UPDATE',
        'TICKET_UPDATE',
    ].forEach((tag) => {
        it(`should be true if valid tag '${tag}' given`, () => {
            expect(validFacebookTags(tag)).to.be.true;
        });
    });
});
