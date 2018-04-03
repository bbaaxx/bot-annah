import { randomBasicFromArray as pickFrom } from '../../actions'

const randomResponses = [
  `Como te va?`,
  `Que tal!`,
  `Saludos invocador`,
  `Hola, creo que tienes lagg :V`,
  `Bienvenido a la grieta del discord xd`,
  `Que pex, saludos desde siliconia`,
]

export default () => Promise.resolve(pickFrom(randomResponses))
