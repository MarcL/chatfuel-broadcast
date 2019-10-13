// https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags

// TODO: Remove these from January 15th 2020
const deprecatedFacebookTags = [
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
];

const chatfuelTags = [
    'UPDATE',
];

const validFacebookTags = [
    'CONFIRMED_EVENT_UPDATE',
    'POST_PURCHASE_UPDATE',
    'ACCOUNT_UPDATE',
    'HUMAN_AGENT',
];

const allValidTags = [...deprecatedFacebookTags, ...validFacebookTags, ...chatfuelTags];

const validateFacebookTags = tag => allValidTags.includes(tag);

export default validateFacebookTags;
