# chatfuel-broadcast
> Wrapper for Chatfuel broadcast API - http://docs.chatfuel.com/broadcasting/broadcasting-documentation/broadcasting-api

## Installation

```
yarn add chatfuel-broadcast
```

```
npm install chatfuel-broadcast
```

### Usage

```javascript
import chatfuelBroadcast from 'chatfuel-broadcast';

const options = {
    // Mandatory options
    botId: '<chatfuel-bot-id>',
    token: '<chatfuel-token>',
    userId: '<chatfuel-user-id>',
    blockId: '<chatfuel-block-name-to-return-to>',

    // User attributes which will be set in Chatfuel
    attributes: {
        myAttribute: 'myValue',
        anotherAttribute: 'anotherValue'
    }
};

// Promise-based response
chatfuelBroadcast(options)
    .then(() => {
        // No response given if everything is ok
    })
    .catch(error => {
        console.log(error.message);
    });
```
