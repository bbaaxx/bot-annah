import { Schema } from 'mongoose'

var chatter = new Schema({
  id: Number,
  accountId: Number,
  name: String,
  profileIconId: Number,
  revisionDate: Number,
  summonerLevel: Number,
})

var summoner = new Schema({
  id: Number,
  accountId: Number,
  name: String,
  profileIconId: Number,
  revisionDate: Number,
  summonerLevel: Number,
})

export default async ctx => {
  console.log('yolotzin')
  return ctx
}
