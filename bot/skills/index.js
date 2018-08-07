import useNlpResponse from './useNlpResponse';
import lolstats from './lolstats';
import global from './global';
import vision from './vision';

const skillset = {
  global,
  lolstats,
  vision,
};

const skillFinder = intent => {
  const [namespace, skill] = intent.split('.');
  const domain = skillset[namespace];
  return typeof domain === 'object' ? domain[skill] : void 0;
};

export default async function(_ctx) {
  const ctx = await _ctx;
  if (ctx.resolved()) return ctx;
  
  const nlp = ctx.get('nlp');
  if (typeof nlp !== 'object') throw new Error('No NLP response was provided');
  
  const { action } = nlp;
  const skill = action && action !== '' && skillFinder(action);
  
  if (skill) ctx.resolve(await skill(ctx));
  
  return ctx;
}
