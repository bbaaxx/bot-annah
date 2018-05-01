import rp from 'request-promise-native';
import regionalProxies from './regionalProxies.json';

export const getRegionalProxy = region => {
  const proxyData = regionalProxies.find(i => i.serviceRegion === region);
  if (!proxyData) throw new Error('Provided region does not exist', region);
  return proxyData.endpoint;
};

export const endpointBuilder = apiPath => region => 
 `https://${getRegionalProxy(region)}${apiPath}`;

export const buildRequest = uri => rp({
  uri,
  qs: { 'api_key': process.env.RIOT_API_KEY },
  json: true,
});