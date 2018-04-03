import Discord from 'discord.js'
import { Subject } from 'rxjs/Rx'
import { Observable } from 'rxjs'
import { zip } from 'rxjs/observable/zip'
import { merge } from 'rxjs/observable/merge'
import { fromEvent } from 'rxjs/observable/fromEvent'

import { adapterReady, incomingMessage, platformMessage } from './actions'

import handleActions from './handlers'

const client = new Discord.Client()

const discardOwnMessages = client => message =>
  Boolean(message.author.id !== client.user.id)
const discardBotMessages = message => !message.author.bot

const commands$ = new Subject()
const reactions$ = new Subject()

const platformMessages$ = fromEvent(client, 'message')
  .filter(discardOwnMessages(client))
  .filter(discardBotMessages)
  .map(platformMessage)

const platformEvents$ = merge(
  fromEvent(client, 'ready').mapTo({ type: 'adapter-ready' }),
)

const messageLoop$ = zip(
  merge(platformEvents$, platformMessages$),
  reactions$,
  (input, reaction) => ({ ...reaction, input }),
)

const platformSubscription = merge(messageLoop$, commands$).subscribe(
  handleActions(client),
)

export default () => ({
  inputs$: merge(platformEvents$, platformMessages$.map(incomingMessage)),
  reactions$,
  commands$,
})
