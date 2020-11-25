import mongoose from 'mongoose';
import AnswerSchema from '../models/Answer';
import UserSchema from '../models/User';
import InvitationSchema from '../models/Invitation';
import QuestionSchema from '../models/Question';
import EventSchema from '../models/Event';

const { MONGODB_URI } = process.env;

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

      cachedDb.model('User', UserSchema);
      cachedDb.model('Invitation', InvitationSchema);
      cachedDb.model('Question', QuestionSchema);
      cachedDb.model('Answer', AnswerSchema);
      cachedDb.model('Event', EventSchema);
    }
    return cachedDb;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { connectToDatabase };
