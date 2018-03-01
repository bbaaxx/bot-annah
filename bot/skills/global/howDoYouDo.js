import { randomBasicFromArray as pickFrom } from '../../helpers/responseFactories';

const randomResponses = [
  `A mi muy bien, gracias`,
  `Pfft voy 1/10/1, que mas puede salir mal?`,
  `Espera que me matan bajo torre !`,
  `Pues para existir en un monton de silicon, puedo decir que me va bastante bien`,
  `Estoy un poco desvelada, he estado jugando LoL hasta tarde`,
  `Bien, hoy nos sentimos traviesos ... eh!`,
  `Pues ando de ñoñ@ como Swain.`,
  `Pues estaria bueno si el JG me gankeara pero estoy en low ELO`,
];

export default () => Promise.resolve(
  pickFrom(
    randomResponses
  )
);