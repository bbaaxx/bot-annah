import { pipe } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { filter, map, mergeAll, catchError } from 'rxjs/operators';

import getAdapter from './adapters/discordJs';

import getContextCreator from './messageContext';
import attemptToTrigerImpulse from './impulses';
import filterMessages from './filterMessages';
import asyncProcessWithNlp from './nlp';
import asyncAttemptSkillHandling from './skills';
import conversationToContext from './skills/conversation';
import asyncResolveReaction from './resolveReaction';

import { socketLogMiddleware } from '../servers/helpers/socketLogger';

const token = process.env.DISCORD_BOT_TOKEN;
const game = {
  type: 'PLAYING',
  name: 'with your mind',
};

export default async function(servers) {
  const adapter = getAdapter();
  const { inputs$, reactions$, commands$ } = adapter;
  const createMessageContext = getContextCreator(servers, adapter);

  const messagesPipeline = pipe(
    filter(i => i.type === 'incoming-message'),

    map(createMessageContext),
    map(socketLogMiddleware),
    map(attemptToTrigerImpulse),
    map(conversationToContext),
    map(filterMessages),
    // Go async ...
    map(asyncProcessWithNlp),
    map(asyncAttemptSkillHandling),
    map(asyncResolveReaction),
    // ... and flatten
    mergeAll(),

    catchError(error => of({ type: 'error', error })),
  );

  const eventsPipeline = pipe(
    filter(i => i.type !== 'incoming-message'),
    catchError(error => of({ type: 'error', error })),
  );

  merge(inputs$.let(messagesPipeline), inputs$.let(eventsPipeline)).subscribe(
    reactions$,
  );

  commands$.next({ type: 'connect', token });

  return { inputs$, reactions$ };
}
