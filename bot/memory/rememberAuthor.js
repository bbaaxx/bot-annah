import { Schema } from 'mongoose';

var authorSchema = new Schema({
  platformId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  platformName: String,
  preferredName: String,
});

export default async function (_ctx) {
  const ctx = await _ctx;
  const db = ctx.get('db');
  if (typeof db === 'undefined') throw new Error('No database service was provided');
  
  const Author = db.model('Author', authorSchema);
  
  const query = { platformId: ctx.getAuthorId() };
  const authorData = {
    platformId: ctx.getAuthorId(),
    platformName: ctx.getAuthorName(),
  };
  
  const author = await Author.findOneAndUpdate(query, authorData, { new: true, upsert: true });
  
  return ctx;
}