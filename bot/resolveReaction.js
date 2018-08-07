export default async _ctx => {
  const ctx = await _ctx;
  if (ctx.resolved()) return ctx.getReaction();
  console.warn('WARN >>> no middleware resolved the request')
  const { reaction } = ctx;
  return reaction;
}