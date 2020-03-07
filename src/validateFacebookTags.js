// https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags

const validChatfuelTags = [
    'UPDATE',
];

const validFacebookTags = [
    'CONFIRMED_EVENT_UPDATE',
    'POST_PURCHASE_UPDATE',
    'ACCOUNT_UPDATE',
    'HUMAN_AGENT',
];

const allValidTags = [...validFacebookTags, ...validChatfuelTags];

const validateFacebookTags = (tag) => allValidTags.includes(tag);

export default validateFacebookTags;
