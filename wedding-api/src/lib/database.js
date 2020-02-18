import mongoose from 'mongoose';
import {GuestSchema, InvitationSchema} from '../models'

const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb = null;

const connectToDatabase = async () => {
  try {
    if (cachedDb == null) {
      console.log('Creating new database connection');
      cachedDb = await mongoose.createConnection(MONGODB_URI, {
        bufferCommands: false,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        poolSize: 10,
        useUnifiedTopology: true,
      });

      cachedDb.model('Guest', GuestSchema);
      cachedDb.model('Invitation', InvitationSchema);
    }
    return cachedDb;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { connectToDatabase };
