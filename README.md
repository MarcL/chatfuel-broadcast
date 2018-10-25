# chatfuel-broadcast

[![Build Status](https://travis-ci.org/MarcL/chatfuel-broadcast.svg?branch=master)](https://travis-ci.org/MarcL/chatfuel-broadcast)

A simplified client for using the [Chatfuel broadcast API](http://docs.chatfuel.com/broadcasting/broadcasting-documentation/broadcasting-api).

## Installation

The module is installed via `npm` or `yarn`:

```
npm install chatfuel-broadcast
```

or

```
yarn add chatfuel-broadcast
```

## Usage

Import or require the module in order to use it:

```javascript
// For ES6 modules
import chatfuelBroadcast from 'chatfuel-broadcast';
```

```javascript
// For ES5 modules
const chatfuelBroadcast = require('chatfuel-broadcast').default;
```

Create an options object which contains the mandatory parameters of `botId`, `token` and `userId`. You will find your `botId` in the Chatfuel dashboard URL for your bot and the `token` is defined in your dashboard. Note that you can only set either `blockId` or `blockName` but you can't pass both parameters. The `blockId` can be seen in the URL of the Chatfuel bot, or you can just use the block name that you define.

Add in the attributes property for the Chatfuel user attributes you want to set:

```javascript
const options = {
    // Mandatory options
    botId: '<chatfuel-bot-id>',
    token: '<chatfuel-token>',
    userId: '<chatfuel-user-id>',

    // Only one of these is needed
    // An error will be thrown if both are passed
    blockName: '<chatfuel-block-name-to-return-to>',
    blockId: '<chatfuel-block-id-to-return-to>',

    // User attributes which will be set in Chatfuel
    attributes: {
        myAttribute: 'myValue',
        anotherAttribute: 'anotherValue'
    }
};
```

Finally, call the broadcast function. It's Promise-based so it expects a then-able function. Add a `catch` function for error handling.

```javascript
// Promise-based response
chatfuelBroadcast(options)
    .then(() => {
        // No response given if everything is ok
        console.log('Call succeeded');
    })
    .catch(error => {
        console.log(error.message);
    });
```

## Running the tests

The unit tests can be run using `npm` or `yarn`:

```
npm test
yarn test
```

## Licence

This project is licensed under the MIT Licence - see the [LICENCE](LICENSE) file for details.
