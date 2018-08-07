export const basicTextReply = text => ({
  type: text && text !== '' ? 'message-reply' : 'ignore',
  message: { contentType: 'text', content: text },
});

export const basicEmbedReply = embed => ({
  type: embed ? 'message-reply' : 'ignore',
  message: { contentType: 'embed', content: embed },
});

export const basicRichContentReply = content => ({
  type: content ? 'message-reply' : 'ignore',
  message: { contentType: 'rich-content', content },
});

export const randomBasicFromArray = replies =>
  basicTextReply(replies[Math.floor(Math.random() * replies.length)]);
