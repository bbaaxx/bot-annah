import { inspect } from 'util';

import askTheIa from '../nlp';
import handleWithASkill from './skills';
import { getStaticReply } from './skills/staticReplies';

const botNameRegExp = /an?na/;
/**
 * message interface :
 * {
 *   content: String,
 *   activeConversation: Boolean,
 * }
 */
export default ctx => {
  // Guardamos el texto en la constante 'content'
  const { content } = ctx.message;
  const { isActive } = ctx.conversation;
  // y una copia en minusculas
  const contentLc = content.toLowerCase();
  // Revisamos si el texto del mensaje contiene el nombre del bot
  const isMyNameInTheMessage = botNameRegExp.test(contentLc);
  // Y buscamos una respuesta estatica (antes de llamar a la IA), 
  const staticReply = getStaticReply(contentLc);
  
  const fallbackAction = Promise.resolve({ type: 'ignored', content: '', contentType: 'none' });
  
  return (
    // Si tenemos una respuesta estatica, la mandamos al canal y listo...
    (staticReply.type === 'response')
      ? Promise.resolve(staticReply)
      // ... de lo contrario, verificamos si el bot es nombrado en el mensaje
      // o si estamos en una conversacion activa
      : (isMyNameInTheMessage || isActive)
      // si es el caso, consultamos a la IA
      ? askTheIa(content)
          .then(handleWithASkill)
          .catch(err => fallbackAction)
      // si nada de esto ocurre y llegamos hasta este punto, quiere decir que 
      // el mensaje no era para nosotros, asi que no hacemos nada :(
      : fallbackAction
  );

};
