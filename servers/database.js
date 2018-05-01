import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

export default () =>
  new Promise((resolve, reject) => {
    const db = mongoose.connection;
    mongoose.connect(MONGO_URI);

    db.on('error', err => reject(err));
    db.once('open', () => {
      console.log('Mongo Database connected');
      resolve(db);
    });
  });
