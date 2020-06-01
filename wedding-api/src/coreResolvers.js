import { connectToDatabase } from './lib/database';

const getInvitation = async (parent, args, context) => {
  try {
    const { uniqueCode } = args;
    const db = await connectToDatabase();
    const InvitationSchema = db.model('Invitation');

    const invitation = await InvitationSchema.findOne({ uniqueCode }).populate('guests').exec();

    return invitation;
  } catch (error) {
    return error;
  }
};

const updateGuest = async (parent, args, context) => {
  try {
    const { input } = args;
    const { guestId, attending, mainCourse, email } = input;
    const db = await connectToDatabase();
    const GuestSchema = db.model('Guest');

    const guest = await GuestSchema.findOneAndUpdate({ _id: guestId }, { attending, mainCourse, email }, { new: true }).exec();

    if (guest) return { success: true };
    return { success: false };
  } catch (error) {
    return error;
  }
};

export default {
  Query: {
    getInvitation,
  },
  Mutation: {
    updateGuest,
  },
};
