import { pipe } from 'rxjs/Rx'
import { of } from 'rxjs/observable/of'
import { merge } from 'rxjs/observable/merge'
import { filter, map, mergeAll, catchError } from 'rxjs/operators'

import filterMessages from './filterMessages'
import attemptToTrigerImpulse from './impulses'
import asyncAttemptSkillHAndling from './skills'
import asyncProcessWithNlp from './nlp'
import getDiscordAdapter from './adapters/discordJs'
import conversationToContext from './skills/conversation'
import { contextFactory, asyncUnwrapContext } from './contexts'

import { socketLogMiddleware } from '../servers/helpers/socketLogger'

const token = process.env.DISCORD_BOT_TOKEN
const game = {
  type: 'PLAYING',
  name: 'with your mind',
}

export default async function(servers) {
  const adapter = getDiscordAdapter()
  const { inputs$, reactions$, commands$ } = adapter
  const createMessageContext = contextFactory(await servers, adapter)
  const messagesPipeline = pipe(
    filter(i => i.type === 'incoming-message'),
    map(i => i.message),
    
    map(createMessageContext),
    map(socketLogMiddleware),
    map(attemptToTrigerImpulse),
    // map(filterMessages),
    map(conversationToContext),
    map(filterMessages),
    // Go async
    map(asyncProcessWithNlp),
    map(asyncAttemptSkillHAndling),
    map(asyncUnwrapContext),
    // Now flatten
    mergeAll(),
    
    catchError(error => of({ type: 'error', error })),
  )
  const eventsPipeline = pipe(
    filter(i => i.type !== 'incoming-message'),
    catchError(error => of({ type: 'error', error })),
  )

  merge(inputs$.let(messagesPipeline), inputs$.let(eventsPipeline)).subscribe(
    reactions$,
  )

  commands$.next({ type: 'connect', token })

  return { inputs$, reactions$ }
}
