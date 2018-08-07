import { Schema } from 'mongoose';
import { getSummonerByName } from '../../../lol-api/summoner';

const summoner = new Schema({
  platformIds: [String],
  id: Number,
  accountId: Number, 
  name: String,
  profileIconId: Number,
  revisionDate: Number,
  summonerLevel: Number,
});

export default async ctx => {
  const nlp = ctx.get('nlp');
  const { summonerName, region } = nlp.parameters;
  const db = ctx.get('db');
  const Summoner = db.model('summoner', summoner);
  
  const summonerData = await getSummonerByName(summonerName, region);
  console.log('yolotzin', summonerData);
  return { type: 'ignore' };
};
