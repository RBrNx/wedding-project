import { connectToDatabase } from './lib/database';

const hello = (args, context) => {
  return 'Your GraphQL API is now LIVE!🎈 ';
};

const getAllGuests = async (args, context) => {
  const db = await connectToDatabase();

  return ['Hello', 'There'];
};

export default {
  Query: {
    hello,
    getAllGuests,
  },
};
