const botNameRegExp = new RegExp(process.env.BOT_NAME_REGEXP || 'bot', 'i');

export default function(ctx) {
  if (ctx.handled) return ctx;
  const { input, conversation } = ctx;

  const activeConversation = Boolean(conversation && conversation.isActive);
  const iWasMentioned = botNameRegExp.test(String(input.content).toLowerCase());

  const shouldAttend = iWasMentioned || activeConversation;

  const type = shouldAttend ? 'process-message' : 'ignore';

  return { ...ctx, type, handled: !shouldAttend };
}
