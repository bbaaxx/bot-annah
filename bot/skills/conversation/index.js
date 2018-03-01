

// export const conversationToContext = ctx => {
//   return ({ ...ctx, conversation: followConversation(ctx.message) }); 
// }

export const recallConversation = ctx => {};
export const rememberConversation = ctx => {};


// const getConversation = authorId => 
//   activeConversations.get(authorId);
// const rememberConversation = conversation => 
//   activeConversations.set(conversation.authorId, conversation);

const conversationFactory = msg => ({
  authorId: msg.author.id,
  lastSeen: new Date(),
  messages: [ msg.content ],
  isActive: false,
});

// export function followConversation(message) {
//   const { author } = message;
  
//   const activeConversation = getConversation(author.id);
//   const wasActive = Boolean(activeConversation);
  
//   const conversation = wasActive 
//     ? { 
//         ...activeConversation,
//         messages: [...activeConversation.messages, message.content],
//         isActive: wasActive,
//       }
//     : conversationFactory(message);
  
//   rememberConversation(conversation);
  
//   return conversation;
// };

export const conversationToContext = ctx => ctx;
