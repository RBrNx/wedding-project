import { QuestionType } from '../../lib/enums';
import { trimObject } from '../../lib/helpers';
import { sendNotificationToAdmins } from '../../lib/helpers/pushNotifications';

const submitRSVPForm = async (parent, { input }, { currentUser, db, dataSources }) => {
  const { rsvpForm } = trimObject(input);
  const { _id, eventId, firstName, lastName } = currentUser;

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

    if (songRequestQuestion) {
      const songRequestAnswer = rsvpForm.find(
        ({ question }) => question === songRequestQuestion?._id?.toString(),
      )?.answer;
      const { spotifyConfig } = await EventModel.findById(eventId);
      const existingTrackUri = existingRSVP?.rsvpForm.find(({ question }) => question.type === 'SONG_REQUEST')?.answer;

      if (existingRSVP && existingTrackUri) {
        await dataSources.spotifyAPI.removeTrackFromPlaylist({
          playlistId: spotifyConfig.playlistId,
          trackUri: existingTrackUri.value,
        });
      }

      if (songRequestAnswer) {
        await dataSources.spotifyAPI.addTrackToPlaylist({
          playlistId: spotifyConfig.playlistId,
          trackUri: songRequestAnswer.value,
        });
      }
    }

    sendNotificationToAdmins(eventId, {
      title: `${firstName} ${lastName} has submitted their RSVP!`,
      body: 'Tap here to see their response',
    });

    return {
      success: true,
      message: 'RSVP submitted successfully',
    };
  } catch (error) {
    console.error('submitRSVPForm', error);
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
