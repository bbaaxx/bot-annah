import { pipe } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { filter, map, mergeAll, catchError } from 'rxjs/operators';

import getDiscordAdapter from './adapters/discordJs';
import getFbAdapter from './adapters/fbMessenger';

import getContextCreator from './messageContext';
import attemptToTrigerImpulse from './impulses';
import filterMessages from './filterMessages';
import conversationToContext from './skills/conversation';
// Async Stuff
import asyncProcessWithNlp from './nlp';
import asyncAttemptSkillHandling from './skills';
import asyncResolveReaction from './resolveReaction';
import asyncResortToNlpResponse from './nlpBasedResponse';

const token = process.env.DISCORD_BOT_TOKEN;
const game = {
  type: 'PLAYING',
  name: 'with your mind',
};

export default async function(servers) {
  const discordAdapter = getDiscordAdapter();
  const fbAdapter = getFbAdapter(servers);
  const { inputs$, reactions$, commands$ } = discordAdapter;
  const createMessageContext = getContextCreator(servers);

  const messagesPipeline = pipe(
    filter(i => i.type === 'incoming-message'),

    map(createMessageContext),
    map(attemptToTrigerImpulse),
    map(conversationToContext),
    map(filterMessages),
    // Go async ...
    map(asyncProcessWithNlp),
    map(asyncAttemptSkillHandling),
    map(asyncResortToNlpResponse),
    map(asyncResolveReaction),
    // ... then flatten
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
  merge(fbAdapter.inputs$.let(messagesPipeline), fbAdapter.inputs$.let(eventsPipeline)).subscribe(
    fbAdapter.reactions$,
  );

  commands$.next({ type: 'connect', token });

  return { inputs$, reactions$ };
}
