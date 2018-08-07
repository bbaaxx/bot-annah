import rp from 'request-promise-native';

const { FB_MESSENGER_PAGE_ACCESS_TOKEN } = process.env;

/*
 * Call the Send API. The message data goes in the body. If successful, we'll
 * get the message id in a response
 *
 */
export default function (psid) {
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
