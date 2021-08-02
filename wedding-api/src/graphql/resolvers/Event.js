import { UserRole } from '../../lib/enums';
import { createCognitoAdminUser, deleteCognitoUser } from '../../lib/helpers/users';

const createEvent = async (parent, { input }, { db }) => {
  let session;
  let userId;

  try {
    const { name, date, admin } = input;
    const { firstName, lastName, email, password } = admin;

    session = await db.startSession();
    session.startTransaction();

    const EventModel = db.model('Event');
    const UserModel = db.model('User');

    const [eventDoc] = await EventModel.create(
      [
        {
          name,
          date,
        },
      ],
      { session },
    );

    const [userDoc] = await UserModel.create(
      [
        {
          eventId: eventDoc._id,
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
      message: 'Event created successfully',
      payload: {
        event: eventDoc,
        admin: userDoc,
      },
    };
  } catch (error) {
    console.error('createEvent', error);
    if (session) await session.abortTransaction();
    if (userId) await deleteCognitoUser({ userId });

    return {
      success: false,
      message: error.message,
    };
  }
};

export default {
  Mutation: {
    createEvent,
  },
};
