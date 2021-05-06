import { QuestionType } from '../../lib/enums';

const submitRSVPForm = async (parent, args, { currentUser, db, dataSources }) => {
  const { input } = args;
  const { rsvpForm } = input;
  const { _id, eventId } = currentUser;

  try {
    const RSVPResponseModel = db.model('RSVPResponse');
    const EventModel = db.model('Event');
    const QuestionModel = db.model('Question');

    const existingRSVP = await RSVPResponseModel.findOne({ userId: _id }).populate('rsvpForm.question');

    if (existingRSVP) {
      await RSVPResponseModel.updateOne({ userId: _id }, { rsvpForm });
    } else {
      const rsvpDoc = new RSVPResponseModel({ userId: _id, eventId, rsvpForm });
      await rsvpDoc.save();
    }

    const songRequestQuestion = await QuestionModel.findOne({ type: QuestionType.SONG_REQUEST, eventId });
    const songRequestAnswer = rsvpForm.find(({ question }) => question === songRequestQuestion._id.toString())?.answer;
    const { spotifyConfig } = await EventModel.findById(eventId);

    if (songRequestQuestion) {
      if (existingRSVP) {
        const existingTrackUri = existingRSVP.rsvpForm.find(
          ({ question }) => question === songRequestQuestion._id.toString(),
        )?.answer;
        await dataSources.spotifyAPI.removeTrackFromPlaylist({
          playlistId: spotifyConfig.playlistId,
          trackUri: existingTrackUri.value,
        });
      }

      await dataSources.spotifyAPI.addTrackToPlaylist({
        playlistId: spotifyConfig.playlistId,
        trackUri: songRequestAnswer.value,
      });
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
