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
        expect(validateFacebookTags('business_productivity')).to.be.false;
    });

    [
        // Deprecated tags
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
        // New valid tags
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
