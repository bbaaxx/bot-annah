// importamos un adaptador para conectarnos a Discord
import getDiscordAdapter from './adapters/discordJs'; // TODO: Move this to app.js
// Y un handler de nuestro bot, este handler es como una oreja o 
// el buzon para nuestro bot porque es alli en donde va a recibir los mensajes.
import messageActionBroker from './messageActionBroker';

import { conversationToContext } from './skills/conversation';

const game = {
  name:'with your mind',
  type: 'PLAYING'
};

// Creamos una funcion para que nos avise en la consola cuando
// nuestro bot se haya conectado a Discord
const readyHandler = client => () => {
  client.user.setPresence({ game });
  console.log(`Logged in as ${client.user.tag || client.user.discriminator} !`);
};

const wrapMessageToContext = services => message => ({
  startedAt: new Date(),
  message,
  services,
});

// Esta es la funcion que vamos a exportar para despertar al bot
export default async servers => {
  const { ws, wss, db } = await servers;
  
  const discordAdapter = getDiscordAdapter();
  
  const { messages$, replies$, actions$ } = discordAdapter;
  
  const services = { pa: { discord: discordAdapter }, ws, wss, db };
  
  // Registramos el handler que creamos antes para que nos avise
  // en la consola cuando el bot se haya conectado a Discord
  discordAdapter.whenWeGetOnline(readyHandler);
  
  // Registramos un handler de nuestro bot para que escuche
  // los mensajes del adaptador de Discord
  messages$
    .map(wrapMessageToContext(services)) // Crea un contexto
    .map(conversationToContext) // Agrega la conversacion (si es que hay una)
    .map(messageActionBroker) // Usa los skills del bot para manejar el mensaje
    .subscribe(replies$); // deposita el resultado en replies$
  
  // Finalmente le pedimos al adaptador de Discord que se conecte.
  discordAdapter.connect();
  
  return services;
}