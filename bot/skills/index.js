import lolstats from './lolstats'

const skillset = {
  lolstats,
}

const skillFinder = intent => {
  const [namespace, skill] = intent.split('.')
  const domain = skillset[namespace]
  return typeof domain === 'object' ? domain[skill] : void 0
}

export default async function(ctx) {
  const { nlp, handled } = await ctx
  if (handled) return ctx
  console.log(ctx)
  const { intent } = nlp
  const skill = intent && intent !== '' && skillFinder(intent)

  return skill ? { ...ctx, reaction: await skill(ctx) } : ctx
}
