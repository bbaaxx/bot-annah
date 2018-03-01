import global from './global';
import lolstats from './lolstats';

// Estos son los intentos disponibles:
//   - lolstats.buildHelp
//   - global.whatCanYouDo
//   - global.howDoYouDo
//   - global.greeting
//   - None (no disponible aqui, manejado por el default)

const skillset = {
  global,
  lolstats,
};

export const skillFinder = intent => {
  const [ namespace, skill ] = intent.split('.');
  const domain = skillset[namespace];
  return typeof domain === 'object' ? domain[skill] : null;
};

export default action => {
  console.log('Attempting to handle intent: ', action);
  const { intent } = action;
  const skill = skillFinder(intent);
  
  if (!skill) throw new Error(`I don't know how to handle ${intent} user intent`);
  
  return skill(action);
};