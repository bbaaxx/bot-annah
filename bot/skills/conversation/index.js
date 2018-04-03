import { addTopic } from '../memory/shortTerm'

const conversations = addTopic('conversations', { stdTTL: 300 })
const conversationFactory = input => ({
  id: input.authorId,
  lastSeen: new Date(),
  messages: [input],
  isActive: false,
})

export default function (ctx) {
  let conversation = conversations.get(ctx.input.authorId)
  if (conversation) {
    conversation.messages.push(ctx.input)
    conversation.isActive = true
  } else {
    conversation = conversationFactory(ctx.input)
  }
  conversations.set(ctx.input.authorId, conversation)

  return { ...ctx, conversation }
}

