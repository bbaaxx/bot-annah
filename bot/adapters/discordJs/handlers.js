const sendMessageResponse = (sourceMessage, response) => 
  sourceMessage.channel.send(response);

export const handleReplies = async msgRes => {
  const [ userMessage, botResponse ] = await msgRes;
  console.log('Handling for type: ', botResponse)
  switch (botResponse.type) {
    case 'reply':
      return sendMessageResponse(userMessage, botResponse.content);
    case 'default':
      return;
  }
};

export const handleActions = action => console.log('Handling platform action: ', action); 