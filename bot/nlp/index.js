import askDf from './dialogflow';
import { basicTextReply } from '../actions';

export default async function(ctx) {
  if (ctx.resolved()) return ctx;
  const nlp = await askDf(ctx.getMessageContent(), {
    sessionId: ctx.getAuthorId(),
  });
  const ctxOut = {
    ...ctx,
    nlp,
    handled: nlp.nlpFulfilled,
  };
  ctx.set('nlp', nlp);
  // if (nlp.nlpFulfilled) ctxOut.reaction = basicTextReply(nlp.fulfillment);
  return ctxOut;
}
