import { randomBasicFromArray as pickFrom } from '../../actions'

const randomResponses = [
  `A mi muy bien, gracias`,
  `Pues ando de ñoña como Swain.`,
  `Espera que me matan bajo torre !`,
  `Bien, hoy nos sentimos traviesos ... eh!`,
  `Pfft voy 1/10/1, que mas puede salir mal?`,
  `Estoy un poco desvelada, he estado jugando LoL hasta tarde`,
  `Bien, pero estaria mejor si el JG gankeara`,
  `Aquí trolleando en low ELO`,
  `Pues para existir en un monton de silicon, puedo decir que me va bastante bien`,
  `Vndo tclado casi nuvo a bun prcio solamnt falla una tcla`,
]

export default async () => pickFrom(randomResponses)
