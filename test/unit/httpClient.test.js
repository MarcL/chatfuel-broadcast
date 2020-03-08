import axios from 'axios';
import rateLimit from 'axios-rate-limit';

jest.mock('axios-rate-limit');
jest.mock('axios');

describe('httpClient', () => {
    it('should set expected rate limiting options', () => {
        const fakeAxiosCreateResponse = {
            get: () => {},
        };
        axios.create.mockReturnValue(fakeAxiosCreateResponse);

        // eslint-disable-next-line global-require
        require('../../src/httpClient');

        expect(rateLimit).toHaveBeenCalledWith(fakeAxiosCreateResponse, { maxRPS: 25 });
    });
});
