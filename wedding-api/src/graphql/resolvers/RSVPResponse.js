import { connectToDatabase } from '../../lib/database';

const submitRSVPForm = async (parent, args, { currentUser }) => {
  const { input } = args;
  const { rsvpForm } = input;
  const { _id, eventId } = currentUser;

  try {
    const db = await connectToDatabase();
    const RSVPResponseModel = db.model('RSVPResponse');

    const rsvpResponseDoc = new RSVPResponseModel({ userId: _id, eventId, rsvpForm });
    await rsvpResponseDoc.save();

    return {
      success: true,
      message: 'RSVP submitted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export default {
  Mutation: {
    submitRSVPForm,
  },
};
