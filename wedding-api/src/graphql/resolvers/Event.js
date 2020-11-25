import { connectToDatabase } from '../../lib/database';

const createEvent = async (parent, { input }) => {
  try {
    const { name, date } = input;

    const db = await connectToDatabase();
    const EventModel = db.model('Event');

    const eventDoc = new EventModel({
      name,
      date,
    });

    await eventDoc.save();

    return {
      success: true,
      message: 'Event created successfully',
      payload: eventDoc,
    };
  } catch (error) {
    return error;
  }
};

export default {
  Mutation: {
    createEvent,
  },
};
