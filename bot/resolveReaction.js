export default async _ctx => {
  const ctx = await _ctx;
  if (ctx.resolved()) return ctx.getReaction();
  console.warn('WARN >>> LEGACY RESOLVE')
  const { reaction } = ctx;
  return reaction;
}