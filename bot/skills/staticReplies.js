// Esta funcion convierte nuestro texto en un objeto con nuestra respuesta y otros
// datos utiles
import { basicTextReply, basicEmbedReply } from '../helpers/responseFactories';

import * as embed from './embedBase.json'

const replyThis = basicTextReply;
// Esta es la funcion que exportamos y se lee mas o menos asi:
// Si el 'content' es igual a 'ping' entonces respondeEsto('pong')
// fijate que solo la primera linea despues del 'export' no tiene
// los dos puntos ' : ', cuando agregues mas lineas no olvides respetar esto.
export const getStaticReply = content => 
    content === 'ping' ? replyThis('pong')
  : content === 'amo el lol' ? replyThis('yo tambien pero eres manco')
  : content === 'odio a teemo' ? replyThis('maldito tejón')
  : content === ':v' ? replyThis('Bv')
  : content === ':u' ? replyThis('Bv')
  : content === 'v:' ? replyThis('Bv')
  : content === 'maldito teemo' ? replyThis('yo tampoco soporto a ese tejón')
  : content === 'embed test' ? basicEmbedReply(embed)
  : {}
