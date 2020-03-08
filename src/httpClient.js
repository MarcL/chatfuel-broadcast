import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const CHATFUEL_API_RATE_LIMIT_REQUESTS_PER_SECOND = 25;

const rateLimitingOptions = {
    maxRPS: CHATFUEL_API_RATE_LIMIT_REQUESTS_PER_SECOND,
};

module.exports = rateLimit(axios.create(), rateLimitingOptions);
