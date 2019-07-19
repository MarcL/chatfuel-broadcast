// https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags
const validFacebookTags = [
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

const validateFacebookTags = tag => validFacebookTags.includes(tag);

export default validateFacebookTags;
