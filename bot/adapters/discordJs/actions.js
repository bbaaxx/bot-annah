export const incomingMessage = ({ message }) => ({
  type: 'incoming-message',
  message: {
    msgId: message.id,
    content: message.content,
    authorId: message.author.id,
    authorName: message.author.username,
    channel: message.channel.id,
  },
})

export const platformMessage = message => ({
  type: 'platform-message',
  message,
})

export const adapterReady = () => ({ type: 'adapter-ready' })
