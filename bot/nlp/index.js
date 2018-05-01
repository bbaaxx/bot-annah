import askDf from './dialogflow';
import { basicTextReply } from '../actions';

export default async function(ctx) {
  if (ctx.resolved()) return ctx;
  const nlp = await askDf(ctx.getMessageContent(), {
    sessionId: ctx.getAuthorId(),
  });

  ctx.set('nlp', nlp);
  return ctx;
}
