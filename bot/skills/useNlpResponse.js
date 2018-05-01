import { basicTextReply as replyWith } from '../actions';

export default async (_ctx) => {
  const ctx = await _ctx;
  const nlp = ctx.get('nlp');
  
  if (typeof nlp !== 'object') throw new Error('No NLP response recieved');
  if (!nlp.nlpFulfilled) throw new Error('No fulfillment was provided by NLP');
  return replyWith(nlp.fulfillment);
};
