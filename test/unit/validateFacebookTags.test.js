import validateFacebookTags from '../../src/validateFacebookTags';

describe('Validate Facebook tags', () => {
    it('should be false if no tag given', () => {
        expect(validateFacebookTags()).toBeFalsy();
    });

    it('should be false if invalid tag given', () => {
        expect(validateFacebookTags('invalid_tag')).toBeFalsy();
    });

    it('should be false if valid tag has incorrect case', () => {
        expect(validateFacebookTags('update')).toBeFalsy();
    });

    [
        'UPDATE',
        'CONFIRMED_EVENT_UPDATE',
        'POST_PURCHASE_UPDATE',
        'ACCOUNT_UPDATE',
        'HUMAN_AGENT',
        'NON_PROMOTIONAL_SUBSCRIPTION',
    ].forEach((tag) => {
        it(`should be true if valid tag '${tag}' given`, () => {
            expect(validateFacebookTags(tag)).toBeTruthy();
        });
    });
});
