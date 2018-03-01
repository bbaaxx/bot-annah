import Discord from 'discord.js';
import { Observable, Subject } from 'rxjs';

import { handleReplies, handleActions } from './handlers';
import { notOwnMessage } from './helpers';

const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;

const rawMessages$ = Observable
  .fromEvent(client, 'message')
  .filter(notOwnMessage(client));

const replies$ = new Subject();
const messages$ = Observable.from(rawMessages$);
const botLoop$ = Observable.zip(rawMessages$, replies$)  
  .map(async ([sourceMsg, reply]) => ([await sourceMsg, await reply]));

const botLoopSubscription = botLoop$.subscribe(handleReplies);

const actions$ = new Subject();
const actionsSubscription = actions$.subscribe(handleActions);

export default config => ({
  messages$,
  replies$,
  actions$,
  connect: () => client.login(token),
  whenWeGetOnline: handler => client.on('ready', handler(client)),
});
