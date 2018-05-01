import { sendTextMessage, sendTypingStatus } from './api';
const logPrefix = 'Adapter[fbMessenger]:';

const wait = t => new Promise(r => setTimeout(r, t));

const platformActions = {
  'default-action'(reaction) {
    console.warn(
      `${logPrefix} I don't know what to do with reaction type: ${
        reaction.type
      }`,
    );
  },
  ignore() {
    return;
  },
  error(reaction) {
    console.log('errored Reaction', reaction)
    return console.error(`${logPrefix} I have an error: ${reaction.error}`);
  },
  'message-reply'(reaction) {
    const { message, input } = reaction;
    sendTypingStatus(input, true);
    wait(1000).then(() => sendTextMessage(message, input) && sendTypingStatus(input, false));
  },
};

const getAction = actionType =>
  actionType in platformActions
    ? platformActions[actionType]
    : platformActions['default-action'];

export default reaction => getAction(reaction.type)(reaction);

