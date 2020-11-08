import { connectToDatabase } from '../../lib/database';
import { AttendanceStatus, QuestionType, UserRole } from '../../lib/enums';
import { stripNonAlphaChars } from '../../lib/helpers';

const getAllGuests = async () => {
  try {
    const db = await connectToDatabase();
    const UserModel = db.model('User');

    const guests = await UserModel.find({ role: UserRole.GUEST }).exec();

    return guests;
  } catch (error) {
    return error;
  }
};

const createGuest = async (parent, { guest }) => {
  try {
    const { firstName, lastName } = guest;

    const db = await connectToDatabase();
    const GuestModel = db.model('User');

    const forename = stripNonAlphaChars(firstName);
    const surname = stripNonAlphaChars(lastName);
    let username = `${forename}${surname}`.toLowerCase();

    const usernameCount = await GuestModel.countDocuments({ username: { $regex: `^${username}` } });
    if (usernameCount > 0) username += usernameCount;

    const guestDoc = new GuestModel({
      firstName,
      lastName,
      username,
      role: UserRole.GUEST,
    });
    await guestDoc.save();

    return {
      success: true,
      message: 'Guest created successfully',
      payload: guestDoc.toObject(),
    };
  } catch (error) {
    return error;
  }
};

const updateGuest = async (parent, args) => {
  try {
    const { input } = args;
    const { guestId, attending, mainCourse, email } = input;
    const db = await connectToDatabase();
    const GuestModel = db.model('Guest');

    const guest = await GuestModel.findOneAndUpdate(
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

const attending = async parent => {
  const { _id } = parent;

  const db = await connectToDatabase();
  const QuestionModel = db.model('Question');
  const AnswerModel = db.model('Answer');

  const attendanceQuestion = await QuestionModel.findOne({ type: QuestionType.ATTENDANCE });
  const answerDoc = await AnswerModel.findOne({ guestId: _id, questionId: attendanceQuestion._id });

  if (!answerDoc) return AttendanceStatus.AWAITING_RSVP;

  const { answer } = answerDoc;
  const userChoice = attendanceQuestion.choices.find(choice => choice._id.toString() === answer);

  return userChoice.value;
};

export default {
  Query: {
    getAllGuests,
  },
  Mutation: {
    createGuest,
    // updateGuest,
  },
  User: {
    attending,
  },
};
