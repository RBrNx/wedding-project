import { connectToDatabase } from './lib/database';

const hello = (args, context) => {
  return 'Your GraphQL API is now LIVE!🎈 ';
};

const getAllGuests = async (args, context) => {
  const db = await connectToDatabase();
  const GuestSchema = db.model('Guest');

  const guests = await GuestSchema.find().exec();

  return guests;
};

const getAllInvitations = async (args, context) => {
  const db = await connectToDatabase();
  const InvitationSchema = db.model('Invitation');

  const invitations = await InvitationSchema.find()
    .populate('guests')
    .exec();

  return invitations;
};

export default {
  Query: {
    hello,
    getAllGuests,
    getAllInvitations,
  },
};
