import { basicEmbedReply as makeRichReplyOf } from '../../actions'

const replyMessage = {
  // content:
  //   'this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```',
  embed: {
    // title: 'title ~~(did you know you can have markdown here too?)~~',
    description:
      'this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown.',
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
    author: {
      name: 'Hola !',
      //   url: 'https://discordapp.com',
      icon_url: 'https://cdn.discordapp.com/embed/avatars/3.png',
    },
    fields: [
      {
        name: '😱',
        value: `
Gracias por preguntar, yo puedo tener conversaciones triviales contigo, contarte chistes, darte algo de 
informacion sobre como usarme... Pero para habilitar mis poderes de Bronza, necesito que me compartas
tu nombre de invocador y tu region, para esto mis creadores han escrito este pequen;o manual:
`,
      },
      {
        name: `Configura tu nombre de invocador y region de LOL 🤔`,
        value:
          `
Si compartes tu nombre de invocador y region conmigo puedo tener acceso a cierta informacion publica
que puede ayudarme a mejorar tu experiencia, intenta pedirme que recuerde tu nombre de invocador. \n
Por ejemplo:
` + '``` Botannah, mi nombre de invocador es bBaaXx y juego en LAN```',
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
}

export default async () => makeRichReplyOf(replyMessage)
