// Esta funcion convierte nuestro texto en un objeto con nuestra respuesta y otros
// datos utiles
import {
  basicTextReply,
  basicEmbedReply,
  randomBasicFromArray as pickFrom,
} from '../actions'

import replyStock from './data/replyDb.json'
import * as embed from './data/embedBase.json'

const xToLower = x => String(x).toLowerCase()
const replies = new Map(replyStock)

const replyThis = basicTextReply

export const checkForStaticReply = content => replies.has(xToLower(content))

// Esta es la funcion que exportamos y se lee mas o menos asi:
// Si el 'content' es igual a 'ping' entonces respondeEsto('pong')
// fijate que solo la primera linea despues del 'export' no tiene
// los dos puntos ' : ', cuando agregues mas lineas no olvides respetar esto.
export const getStaticReply = content => {
  const reply = replies.get(xToLower(content))
  return reply && Array.isArray(reply) ? pickFrom(reply) : replyThis(reply)
}
