export default (services) => input => {
  const { message } = input;
  const { ws, wss, db } = services;
  const ctxMap = new Map(); // eslint-disable-line
  
  ctxMap.set('resolved', false);
  ctxMap.set('startedAt', new Date());
  ctxMap.set('message', message);
  ctxMap.set('ws', ws);
  ctxMap.set('wss', wss);
  ctxMap.set('db', db);
  ctxMap.set('reaction', void 0);
  
  return {
    // setter & getter
    set: (key, value) => ctxMap.set(key, value),
    get: key => ctxMap.get(key),
    
    // Sugar
    getMessage: () => ctxMap.get('message'),
    getMessageContent: () => ctxMap.get('message').content,
    getAuthorId: () => ctxMap.get('message').authorId,
    getAuthorName: () => ctxMap.get('message').authorName,
    getReaction: () => ctxMap.get('reaction'),
    
    // resolve
    resolve: reaction => ctxMap.set('resolved', true) && ctxMap.set('reaction', reaction),
    resolved: () => ctxMap.get('resolved'),
    reaction: {},
  };
};
