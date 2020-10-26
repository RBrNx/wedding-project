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

const createQuestion = async (parent, args, context) => {
  const { question } = args;

  try {
    const db = await connectToDatabase();
    const QuestionModel = db.model('Question');

    const questionDoc = new QuestionModel(question);
    await questionDoc.save();

    return {
      success: true,
      feedback: "Question created successfully"
    }
  } catch(error) {
    return error;
  }
}

export default {
  Query: {
    getAllGuests,
    getAllInvitations,
  },
  Mutation: {
    createQuestion
  }
};
