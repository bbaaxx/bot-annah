export default ctx => message => ctx.services.wss.sockets.emit('log', message);

export const socketLogMiddleware = ctx => {
  ctx.services.wss.sockets.emit('log', ctx.getMessage());
  return ctx;
};
