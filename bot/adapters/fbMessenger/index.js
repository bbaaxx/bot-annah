import { Subject, Observable } from 'rxjs/Rx';
import { zip } from 'rxjs/observable/zip';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';

import actionHandler from './handlers';
import { publishMessage, platformMessage } from './actions';

const commands$ = new Subject();
const incomingEvents$ = new Subject();
const reactions$ = new Subject();

import { authController, mainController } from './webhook';

const { FB_WEBHOOK_ENDPOINT } = process.env;

const configureExpressApp = ({ app }) => {
  app.get(`/${FB_WEBHOOK_ENDPOINT}`, authController);
  app.post(`/${FB_WEBHOOK_ENDPOINT}`, mainController(incomingEvents$));
};

const platformMessages$ = incomingEvents$
  .map(platformMessage);

// const platformEvents$ = merge(fromEvent(client, 'ready').map(adapterReady));

const messageLoop$ = zip(
  platformMessages$,
  reactions$,
  (input, reaction) => ({ ...reaction, input }),
);

const platformSubscription = merge(messageLoop$, commands$).subscribe(
  actionHandler,
);

// messageLoop$.subscribe({ next: v => console.log('value from loop: ', v) });

export default servers => {
  const { ws } = servers;
  configureExpressApp(ws);
  return {
    inputs$: platformMessages$.map(publishMessage),
    reactions$,
    commands$,
  }
};
