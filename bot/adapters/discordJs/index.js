import Discord from 'discord.js';
import { Subject, Observable } from 'rxjs/Rx';
import { zip } from 'rxjs/observable/zip';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';

import actionHandler from './handlers';
import { adapterReady, publishMessage, platformMessage } from './actions';
import { discardOwnMessages, discardBotMessages } from './messageHelpers';

const client = new Discord.Client();

const commands$ = new Subject();
const reactions$ = new Subject();

// TODO: Let the bot handle the errors
client.on('error', console.error);

const platformMessages$ = fromEvent(client, 'message')
  .filter(discardOwnMessages(client))
  .filter(discardBotMessages)
  .map(platformMessage);

const platformEvents$ = merge(fromEvent(client, 'ready').map(adapterReady));

const messageLoop$ = zip(
  merge(platformEvents$, platformMessages$),
  reactions$,
  (input, reaction) => ({ ...reaction, input }),
);

const platformSubscription = merge(messageLoop$, commands$).subscribe(
  actionHandler(client),
);

export default () => ({
  inputs$: merge(platformEvents$, platformMessages$.map(publishMessage)),
  reactions$,
  commands$,
});
