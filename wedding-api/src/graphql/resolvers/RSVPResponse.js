const submitRSVPForm = async (parent, args, { currentUser, db }) => {
  const { input } = args;
  const { rsvpForm } = input;
  const { _id, eventId } = currentUser;

  try {
    const RSVPResponseModel = db.model('RSVPResponse');

    const rsvpExists = await RSVPResponseModel.exists({ userId: _id });
    let rsvpDoc;

    if (rsvpExists) {
      rsvpDoc = await RSVPResponseModel.updateOne({ userId: _id }, { rsvpForm });
    } else {
      rsvpDoc = new RSVPResponseModel({ userId: _id, eventId, rsvpForm });
      await rsvpDoc.save();
    }

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
