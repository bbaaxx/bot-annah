import askDf from './dialogflow'
import { basicTextReply } from '../actions'

export default async function(ctx) {
  const { handled, message } = await ctx
  if (handled) return ctx
  const nlp = await askDf(ctx.message.content, {
    sessionId: ctx.message.authorId,
  })
  const ctxOut = {
    ...ctx,
    nlp,
    handled: nlp.nlpFulfilled,
  }
  if (nlp.nlpFulfilled) ctxOut.reaction = basicTextReply(nlp.fulfillment)
  return ctxOut
}
