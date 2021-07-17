import { AttendanceStatus, QuestionType, UserRole } from '../../lib/enums';
import {
  createCognitoAdminUser,
  createCognitoUser,
  deleteCognitoUser,
  generateTemporaryCredentials,
} from '../../lib/helpers/users';

const getAllGuests = async (parent, args, { currentUser, db }) => {
  try {
    const UserModel = db.model('User');

    const guests = await UserModel.find({ role: UserRole.GUEST, eventId: currentUser.eventId }).exec();

    return guests;
  } catch (error) {
    return error;
  }
};

const createGuest = async (parent, { guest }, { currentUser, db }) => {
  let session;
  let userId;

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
    userId = userDoc._id.toString();
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
      userId,
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
    await deleteCognitoUser({ userId });

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
  let userId;

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
    userId = userDoc._id.toString();

    const cognitoUser = await createCognitoAdminUser({ userId, email, password });
    const cognitoUserId = cognitoUser.UserSub;

    await UserModel.findOneAndUpdate({ _id: userId }, { cognitoUserId }, { session });

    await session.commitTransaction();

    return {
      success: true,
      message: 'Admin created successfully',
      payload: userDoc,
    };
  } catch (error) {
    if (session) await session.abortTransaction();
    await deleteCognitoUser({ userId });

    return {
      success: false,
      message: error.message,
    };
  }
};

const attendanceStatus = async (parent, args, { db }) => {
  const { _id: userId, eventId } = parent;

  const RSVPResponseModel = db.model('RSVPResponse');

  const rsvpResponse = await RSVPResponseModel.findOne({ userId, eventId }).populate('rsvpForm.question');

  if (!rsvpResponse) return AttendanceStatus.AWAITING_RSVP;

  const { answer } = rsvpResponse.rsvpForm.find(({ question }) => question.type === QuestionType.ATTENDANCE);

  return answer.value;
};

const rsvpForm = async (parent, args, { db }) => {
  const { _id, eventId } = parent;

  const RSVPResponseModel = db.model('RSVPResponse');

  const rsvpResponse = await RSVPResponseModel.findOne({ eventId, userId: _id }).populate('rsvpForm.question');

  return rsvpResponse?.rsvpForm;
};

const getCurrentUser = (parent, args, { currentUser }) => {
  return currentUser;
};

export default {
  Query: {
    getAllGuests,
    getCurrentUser,
  },
  Mutation: {
    createGuest,
    createAdmin,
  },
  User: {
    attendanceStatus,
    rsvpForm,
  },
};
