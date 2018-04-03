import { checkForStaticReply, getStaticReply } from './staticReplies'

export default function(ctx) {
  if (ctx.handled) return ctx
  const { content } = ctx.message
  const iHaveAnImpulseReply = checkForStaticReply(content)
  const reaction = iHaveAnImpulseReply ? getStaticReply(content) : ctx.reaction
  return { ...ctx, handled: iHaveAnImpulseReply, reaction }
}
