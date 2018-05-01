import { endpointBuilder, buildRequest } from './helpers';

const getEndpoint = endpointBuilder('/lol/summoner/v3/summoners');

export const getSummonerById = (id, region) => 
  buildRequest(`${getEndpoint(region)}/${id}`);
export const getSummonerByName = (name, region) => 
  buildRequest(`${getEndpoint(region)}/by-name/${name}`);
export const getSummonerByAccount = (id, region) => 
  buildRequest(`${getEndpoint(region)}/by-account/${id}`);

export default {
  getSummonerByName,
  getSummonerById,
  getSummonerByAccount,
}