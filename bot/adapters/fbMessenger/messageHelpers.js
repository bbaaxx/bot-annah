export const marshallMessage = ({ message }) => ({
  msgId: message.message.mid,
  content: message.message.text,
  authorId: message.sender.id,
  // authorName: message.author.username,
  channel: message.pageId,
  attachments: message.attachments,
});
