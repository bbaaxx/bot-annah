export const contextFactory = (services, platform) => input => ({
  startedAt: new Date(),
  platform,
  message: input,
  input,
  services,
  reaction: { type: 'ignore' },
  analysis: {},
  handled: false,
})

export const asyncUnwrapContext = async ctx => (await ctx).reaction
