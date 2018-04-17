import lolstats from './lolstats';
import global from './global';

const skillset = {
  global,
  lolstats,
};

const skillFinder = intent => {
  const [namespace, skill] = intent.split('.');
  const domain = skillset[namespace];
  return typeof domain === 'object' ? domain[skill] : void 0;
};

export default async function(_ctx) {
  const ctx = await _ctx;
  if (ctx.resolved()) return ctx;
  const { nlp } = ctx;
  const { action } = nlp;
  const skill = action && action !== '' && skillFinder(action);
  if (skill) ctx.resolve(await skill(ctx));
  return ctx;
  return skill ? { ...ctx, reaction: await skill(ctx) } : ctx;
}
