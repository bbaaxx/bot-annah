import { basicEmbedReply as makeRichReplyOf } from '../../actions';

const replyMessage = {
  // content:
  //   'this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```',
  embed: {
    // title: 'title ~~(did you know you can have markdown here too?)~~',
    author: {
      name: 'Hola !',
      //   url: 'https://discordapp.com',
      icon_url: 'https://cdn.discordapp.com/embed/avatars/3.png',
    },
    description:
      // 'this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown.',
      '**Soy Bot Annah**',
    // url: 'https://discordapp.com',
    color: 13565214,
    timestamp: '2018-02-20T23:43:51.079Z',
    // footer: {
    //   icon_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
    //   text: 'footer text',
    // },
    // thumbnail: {
    //   url: 'https://cdn.discordapp.com/embed/avatars/1.png',
    // },
    // image: {
    //   url: 'https://cdn.discordapp.com/embed/avatars/2.png',
    // },
    fields: [
      {
        name: '😱',
        value: `
*Bueno, yo puedo hablar contigo de una manera especial 7v7, contarte chistes, te puedo decir como interactuar conmigo... Pero para poder usar mis poderes de bronza, necesito que me digas
tu nombre de invocador y tu region, para esto mis creadores escribieron  este mini manual:*
`,
      },
      {
        name: `✨Escribe tu nombre de invocador y region de LoL 😉`,
        value:
          `
*Si me dices tu nombre de invocador y region conmigo, puedo tener acceso a cierta informacion publica
que puede ayudarme a mejorar tu experiencia, intenta pedirme que recuerde tu nombre de invocador. \n
Por ejemplo:*
` + '```Botannah, mi nombre de invocador es bBaaXx y juego en LAN```',
      },

      //   {
      //     name: '🙄',
      //     value:
      //       'an informative error should show up, and this view will remain as-is until all issues are fixed',
      //   },
      //   {
      //     name: '<:eye:219069250692841473>',
      //     value: 'these last two',
      //     inline: true,
      //   },
      //   {
      //     name: ':hankey:',
      //     value: 'are inline fields',
      //     inline: true,
      //   },
    ],
  },
};

export default async () => makeRichReplyOf(replyMessage);
