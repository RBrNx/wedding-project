import { connectToDatabase } from './lib/database';

const getAllGuests = async (args, context) => {
  try {
    const db = await connectToDatabase();
    const GuestSchema = db.model('Guest');

    const guests = await GuestSchema.find().exec();

    return guests;
  } catch (error) {
    return error;
  }
};

const getAllInvitations = async (args, context) => {
  try {
    const db = await connectToDatabase();
    const InvitationSchema = db.model('Invitation');

    const invitations = await InvitationSchema.find().populate('guests').exec();

    return invitations;
  } catch (error) {
    return error;
  }
};

export default {
  Query: {
    getAllGuests,
    getAllInvitations,
  },
};
