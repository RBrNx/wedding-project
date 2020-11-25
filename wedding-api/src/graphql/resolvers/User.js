import { connectToDatabase } from '../../lib/database';
import { AttendanceStatus, QuestionType, UserRole } from '../../lib/enums';
import { createCognitoUser, generateTemporaryCredentials } from '../../lib/helpers/users';

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
  let session;

  try {
    const { firstName, lastName } = guest;

    const db = await connectToDatabase();
    session = await db.startSession();
    session.startTransaction();

    const UserModel = db.model('User');
    const TempLoginDetailsModel = db.model('TempLoginDetails');

    const [userDoc] = await UserModel.create(
      [
        {
          eventId: '5fbea387019cca16234648f0', // TODO: Pull this from CurrentUser
          firstName,
          lastName,
          role: UserRole.GUEST,
        },
      ],
      { session },
    );
    const { username, password } = await generateTemporaryCredentials({ firstName, lastName });

    await TempLoginDetailsModel.create(
      [
        {
          userId: userDoc._id,
          username,
          password,
        },
      ],
      { session },
    );

    await createCognitoUser({ userId: userDoc._id.toString(), username, password });

    await session.commitTransaction();

    return {
      success: true,
      message: 'Guest created successfully',
      payload: userDoc,
    };
  } catch (error) {
    if (session) await session.abortTransaction();

    return {
      success: false,
      message: error.message,
    };
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
