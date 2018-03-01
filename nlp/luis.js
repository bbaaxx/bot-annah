import rp from 'request-promise-native';

const luisUri = `${process.env.LUIS_ENDPOINT}/${process.env.LUIS_APPID}`;

const baseConfig = {
  uri: luisUri,
  qs: { 'subscription-key': process.env.LUIS_SUBSCRIPTION_KEY },
  headers: { 'User-Agent': 'Request-Promise' },
  json: true
};

export default text => {
  const opts = { ...baseConfig };
  opts.qs.q = text;
  return rp(opts);
};
