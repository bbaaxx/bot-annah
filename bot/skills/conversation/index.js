import { addTopic } from '../memory/shortTerm';

const conversations = addTopic('conversations', { stdTTL: 120 });
const conversationFactory = input => ({
  id: input.authorId,
  lastSeen: new Date(),
  messages: [input],
  isActive: false,
});

export default function(ctx) {
  const message = ctx.getMessage();
  let conversation = conversations.get(ctx.getAuthorId());
  if (conversation) {
    conversation.messages.push(message);
    conversation.isActive = true;
  } else {
    conversation = conversationFactory(message);
  }
  conversations.set(ctx.getAuthorId(), conversation);
  ctx.set('conversation', conversation);
  return { ...ctx, conversation };
}
