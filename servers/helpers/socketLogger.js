export default ctx => message => 
  ctx.services.wss.sockets.emit('log', message)

export const socketLogMiddleware = ctx => {
  console.log('hit')
  ctx.services.wss.sockets.emit('log', ctx.message)
  return ctx
}