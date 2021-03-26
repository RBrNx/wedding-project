import mongoose from 'mongoose';
import UserSchema from '../models/User';
import InvitationGroupSchema from '../models/InvitationGroup';
import QuestionSchema from '../models/Question';
import EventSchema from '../models/Event';
import TempLoginDetailsSchema from '../models/TempLoginDetails';
import RSVPResponseSchema from '../models/RSVPResponse';

const { MONGODB_URI } = process.env;

let cachedDb = null;

const connectToDatabase = async () => {
  if (!MONGODB_URI) throw new Error('MONGODB_URI is required.');

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

      cachedDb.model('User', UserSchema);
      cachedDb.model('InvitationGroup', InvitationGroupSchema);
      cachedDb.model('Question', QuestionSchema);
      cachedDb.model('RSVPResponse', RSVPResponseSchema);
      cachedDb.model('Event', EventSchema);
      cachedDb.model('TempLoginDetails', TempLoginDetailsSchema);
    } else console.log('using cachedDb');
    return cachedDb;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { connectToDatabase };
