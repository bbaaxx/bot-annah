import { marshallMessage } from './messageHelpers';

export const incomingMessage = ({ message }) => ({
  type: 'incoming-message',
  message: marshallMessage(message),
});

export const platformMessage = message => ({
  type: 'platform-message',
  message,
});

export const adapterReady = () => ({ type: 'adapter-ready' });
