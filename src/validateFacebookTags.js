// https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags

const validFacebookTags = [
    'CONFIRMED_EVENT_UPDATE',
    'POST_PURCHASE_UPDATE',
    'ACCOUNT_UPDATE',
    'HUMAN_AGENT',
];

const validateFacebookTags = tag => validFacebookTags.includes(tag);

export default validateFacebookTags;
