// https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags

const validChatfuelTags = [
    'UPDATE',
];

const validFacebookTags = [
    // Standard tags
    'CONFIRMED_EVENT_UPDATE',
    'POST_PURCHASE_UPDATE',
    'ACCOUNT_UPDATE',
    'HUMAN_AGENT',

    // Valid if page is approved under News Page Index (NPI)
    'NON_PROMOTIONAL_SUBSCRIPTION',
];

const allValidTags = [...validFacebookTags, ...validChatfuelTags];

const validateFacebookTags = (tag) => allValidTags.includes(tag);

export default validateFacebookTags;
