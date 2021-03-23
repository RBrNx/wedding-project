const submitRSVPForm = async (parent, args, { currentUser, db }) => {
  const { input } = args;
  const { rsvpForm } = input;
  const { _id, eventId } = currentUser;

  try {
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
