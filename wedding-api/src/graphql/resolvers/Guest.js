import { connectToDatabase } from '../../lib/database';

const getAllGuests = async () => {
  try {
    const db = await connectToDatabase();
    const GuestSchema = db.model('Guest');

    const guests = await GuestSchema.find().exec();

    return guests;
  } catch (error) {
    return error;
  }
};

const updateGuest = async (parent, args) => {
  try {
    const { input } = args;
    const { guestId, attending, mainCourse, email } = input;
    const db = await connectToDatabase();
    const GuestSchema = db.model('Guest');

    const guest = await GuestSchema.findOneAndUpdate(
      { _id: guestId },
      { attending, mainCourse, email },
      { new: true },
    ).exec();

    if (guest) return { success: true };
    return { success: false };
  } catch (error) {
    return error;
  }
};

export default {
  queries: [{ resolver: getAllGuests, authenticated: true }],
  mutations: [{ resolver: updateGuest, authenticated: true }],
};
