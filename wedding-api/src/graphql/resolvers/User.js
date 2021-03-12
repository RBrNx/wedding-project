import { AttendanceStatus, QuestionType, UserRole } from '../../lib/enums';
import { createCognitoAdminUser, createCognitoUser, generateTemporaryCredentials } from '../../lib/helpers/users';

const getAllGuests = async (parent, args, { db }) => {
  try {
    const UserModel = db.model('User');

    const guests = await UserModel.find({ role: UserRole.GUEST }).exec();

    return guests;
  } catch (error) {
    return error;
  }
};

const createGuest = async (parent, { guest }, { currentUser, db }) => {
  let session;

  try {
    const { firstName, lastName } = guest;

    session = await db.startSession();
    session.startTransaction();

    const UserModel = db.model('User');
    const TempLoginDetailsModel = db.model('TempLoginDetails');

    const [userDoc] = await UserModel.create(
      [
        {
          eventId: currentUser.eventId,
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

    const cognitoUser = await createCognitoUser({
      userId: userDoc._id.toString(),
      username,
      password,
    });
    const cognitoUserId = cognitoUser.Attributes.find(({ Name }) => Name === 'sub')?.Value;

    await UserModel.findOneAndUpdate({ _id: userDoc._id }, { cognitoUserId }, { session });

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

// const updateGuest = async (parent, args) => {
//   try {
//     const { input } = args;
//     const { guestId, attending, mainCourse, email } = input;
//     const db = await connectToDatabase();
//     const GuestModel = db.model('Guest');

//     const guest = await GuestModel.findOneAndUpdate(
//       { _id: guestId },
//       { attending, mainCourse, email },
//       { new: true },
//     ).exec();

//     if (guest) return { success: true };
//     return { success: false };
//   } catch (error) {
//     return error;
//   }
// };

const createAdmin = async (parent, { input }, { currentUser, db }) => {
  let session;

  try {
    const { firstName, lastName, email, password, eventId } = input;

    session = await db.startSession();
    session.startTransaction();

    const UserModel = db.model('User');

    const [userDoc] = await UserModel.create(
      [
        {
          eventId: eventId || currentUser.eventId,
          firstName,
          lastName,
          role: UserRole.ADMIN,
          email,
        },
      ],
      { session },
    );

    const cognitoUser = await createCognitoAdminUser({ userId: userDoc._id.toString(), email, password });
    const cognitoUserId = cognitoUser.UserSub;

    await UserModel.findOneAndUpdate({ _id: userDoc._id }, { cognitoUserId }, { session });

    await session.commitTransaction();

    return {
      success: true,
      message: 'Admin created successfully',
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

// const attending = async parent => {
//   const { _id } = parent;

//   const db = await connectToDatabase();
//   const QuestionModel = db.model('Question');
//   const AnswerModel = db.model('Answer');

//   const attendanceQuestion = await QuestionModel.findOne({ type: QuestionType.ATTENDANCE });
//   const answerDoc = await AnswerModel.findOne({ guestId: _id, questionId: attendanceQuestion?._id });

//   if (!attendanceQuestion || !answerDoc) return AttendanceStatus.AWAITING_RSVP;

//   const { answer } = answerDoc;
//   const userChoice = attendanceQuestion.choices.find(choice => choice._id.toString() === answer);

//   return userChoice.value;
// };

const rsvpForm = async (parent, args, { db }) => {
  const { _id, eventId } = parent;

  const RSVPResponseModel = db.model('RSVPResponse');

  const rsvpResponse = await RSVPResponseModel.findOne({ eventId, userId: _id }).populate('rsvpForm.question');

  return rsvpResponse?.rsvpForm;
};

  return userChoice.value;
};

export default {
  Query: {
    getAllGuests,
  },
  Mutation: {
    createGuest,
    createAdmin,
  },
  User: {
    // attending,
    rsvpForm,
  },
};
