export const basicTextReply = text => ({ type: 'reply', contentType: 'text', content: text });

export const basicEmbedReply = embed => ({ type: 'reply', contentType: 'embed', content: embed });
export const basicRichContentReply = content => ({ type: 'reply', contentType: 'rich-content', content });

export const randomBasicFromArray = replies => 
  basicTextReply(replies[Math.floor(Math.random() * replies.length)]);