import { AttendanceStatus, QuestionType, UserRole } from '../../lib/enums';
import { createCognitoAdminUser, createGuestUser, deleteCognitoUser } from '../../lib/helpers/users';

const getAllGuests = async (parent, { input }, { currentUser, db }) => {
  try {
    const { searchTerm } = input || {};
    const UserModel = db.model('User');

    const guests = await UserModel.aggregate([
      {
        $match: {
          role: UserRole.GUEST,
          eventId: currentUser.eventId,
          ...(searchTerm && {
            $or: [
              { firstName: new RegExp(`${searchTerm}`, 'i') },
              { lastName: new RegExp(`${searchTerm}`, 'i') },
              { email: new RegExp(`${searchTerm}`, 'i') },
            ],
          }),
        },
      },
      {
        $lookup: {
          from: 'templogindetails',
          localField: '_id',
          foreignField: 'user',
          as: 'logindetails',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$logindetails', 0] }, '$$ROOT'] } },
      },
      {
        $project: {
          details: 0,
          username: 0,
          password: 0,
          user: 0,
          disabled: 0,
        },
      },
    ]);

    return guests;
  } catch (error) {
    console.error('getAllGuests', error);
    return error;
  }
};

const createGuest = async (parent, { invitationId, guest }, { currentUser, db }) => {
  let session;
  let userId;

  try {
    session = await db.startSession();
    session.startTransaction();

    const user = await createGuestUser(guest, invitationId, db, currentUser, session);
    userId = user._id.toString();

    await session.commitTransaction();

    return {
      success: true,
      message: 'Guest created successfully',
      payload: user,
    };
  } catch (error) {
    console.error('createGuest', error);
    if (session) await session.abortTransaction();
    if (userId) await deleteCognitoUser({ userId });

    return {
      success: false,
      message: error.message,
    };
  }
};

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
    console.error('createAdmin', error);
    if (session) await session.abortTransaction();
    if (userId) await deleteCognitoUser({ userId });

    return {
      success: false,
      message: error.message,
    };
  }
};

const deleteGuest = async (parent, { id }, { db }) => {
  try {
    const UserModel = db.model('User');

    const userDoc = await UserModel.findByIdAndDelete(id);

    return {
      success: true,
      message: 'Guest deleted successfully',
      payload: userDoc,
    };
  } catch (error) {
    console.error('deleteGuest', error);
    return error;
  }
};

const registerPushToken = async (parent, { token }, { currentUser, db }) => {
  try {
    const UserModel = db.model('User');

    await UserModel.updateOne({ _id: currentUser._id }, { pushNotificationToken: token });

    return {
      success: true,
      message: 'Push token registered successfully',
    };
  } catch (error) {
    console.error('registerPushToken', error);
    return error;
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
    deleteGuest,
    registerPushToken,
  },
  User: {
    attendanceStatus,
    rsvpForm,
  },
};
