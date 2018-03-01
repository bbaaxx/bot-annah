import { randomBasicFromArray as pickFrom } from '../../helpers/responseFactories';

const randomResponses = [
  `Como te va?`,
  `Que tal!`,
  `Saludos invocador`,
  `Hola, creo que tienes lagg :V`,
  `Bienvenido a la grieta del invocador xd`
];

export default () => Promise.resolve(pickFrom(randomResponses));
