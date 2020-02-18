import { connectToDatabase } from './lib/database';

const hello = (args, context) => {
  return 'Your GraphQL API is now LIVE!🎈 ';
};

const getAllGuests = async (args, context) => {
  const db = await connectToDatabase();
  const Guest = db.model('Guest');

  const guests = await Guest.find().exec();
  
  return guests;
};

export default {
  Query: {
    hello,
    getAllGuests,
  },
};
