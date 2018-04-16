import apiai from 'apiai';

const { DF_CLIENT_ACCESS_TOKEN } = process.env;
const agent = apiai(DF_CLIENT_ACCESS_TOKEN);

const checkFulfilled = fulfillment =>
  Boolean(fulfillment.messages) &&
  Array.isArray(fulfillment.messages) &&
  Boolean(fulfillment.messages.length > 0) &&
  Boolean(fulfillment.speech && fulfillment.speech !== '');
const getFulfillment = fl => fl.messages[0].speech;

const marshallResponse = response => {
  const { result, lang, status } = response;
  const { action, parameters, fulfillment } = result || {};
  const reaction = {
    type: 'nlp-response',
    lang,
    action,
    parameters,
    nlpFulfilled: checkFulfilled(fulfillment),
    query: result.resolvedQuery,
  };
  if (action && action !== '' && reaction.nlpFulfilled)
    reaction.fulfillment = getFulfillment(fulfillment);
  return reaction;
};

export default (content, options = {}) =>
  new Promise((resolve, reject) => {
    const request = agent.textRequest(content, options);
    request.on('response', resolve);
    request.on('error', reject);
    request.end();
  }).then(marshallResponse);
