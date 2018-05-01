import rp from 'request-promise-native';

const { FB_MESSENGER_PAGE_ACCESS_TOKEN } = process.env;

export function callSendAPI(messageData) {
  return rp({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: FB_MESSENGER_PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  })
    .catch(err => console.error(err));
}

export function getPsidData(psid) {
  return rp({
    uri: `https://graph.facebook.com/v2.6/${psid}`,
    qs: {
      fields: 'first_name,last_name,profile_pic',
      access_token: FB_MESSENGER_PAGE_ACCESS_TOKEN 
    },
    method: 'GET',
  })
    .catch(err => console.error(err));
}

/*
 * Send a text message using the Send API.
 *
 */
export function sendTextMessage(response, input) {
  return callSendAPI({
    recipient: input.message.sender,
    message: {
      text: response.content,
      metadata: 'DEVELOPER_DEFINED_METADATA'
    }
  });
}

export function sendTypingStatus({ message: { sender } }, status) {
  return callSendAPI({
    recipient: sender,
    sender_action: `typing_${status ? 'on' : 'off'}`
  });
}