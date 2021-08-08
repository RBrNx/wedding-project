import { createGuestUser, deleteCognitoUser, deleteGuestUser } from '../../lib/helpers/users';

const getInvitationGroup = async (parent, { id }, { db }) => {
  try {
    const InvitationGroupModel = db.model('InvitationGroup');

    const invitationGroup = await InvitationGroupModel.findBbyId(id).populate('guests').exec();

    return invitationGroup;
  } catch (error) {
    return error;
  }
};

const getAllInvitationGroups = async (parent, args, { currentUser, db }) => {
  try {
    const InvitationGroupModel = db.model('InvitationGroup');

    const invitationGroups = await InvitationGroupModel.find({ eventId: currentUser.eventId })
      .populate('guests')
      .exec();

    return invitationGroups;
  } catch (error) {
    return error;
  }
};

const createInvitationGroup = async (parent, { invitationGroup }, { currentUser, db }) => {
  let session;
  let guestUsers;

  try {
    const InvitationGroupModel = db.model('InvitationGroup');
    const { guests, type } = invitationGroup;

    session = await db.startSession();
    session.startTransaction();

    const [invitationGroupDoc] = await InvitationGroupModel.create([{ eventId: currentUser.eventId, type }], {
      session,
    });

    const guestsToInvite = guests.reduce((acc, currentGuest) => {
      const { firstName, lastName } = currentGuest;
      acc.push(currentGuest);

      if (currentGuest.hasPlusOne) acc.push({ firstName, lastName: `${lastName}s Guest` });

      return acc;
    }, []);

    guestUsers = await Promise.all(
      guestsToInvite.map(async guest => createGuestUser(guest, invitationGroupDoc._id, db, currentUser, session)),
    );

    const completeInvitationGroup = await InvitationGroupModel.findById(
      invitationGroupDoc._id,
      {},
      { session },
    ).populate('guests');

    await session.commitTransaction();

    return {
      success: true,
      message: 'InvitationGroup created successfully',
      payload: completeInvitationGroup,
    };
  } catch (error) {
    console.error('createInvitationGroup', error);
    if (session) await session.abortTransaction();
    if (guestUsers?.length)
      await Promise.all(guestUsers.map(guestUser => deleteCognitoUser({ userId: guestUser.__id.toString() })));

    return {
      success: false,
      message: error.message,
    };
  }
};

const deleteInvitationGroup = async (parent, { id }, { db }) => {
  try {
    const InvitationGroupModel = db.model('InvitationGroup');

    const invitationGroup = await InvitationGroupModel.findById(id).populate('guests');

    await Promise.all(invitationGroup.guests.map(guest => deleteGuestUser(guest, db)));

    await InvitationGroupModel.findByIdAndDelete(id);

    return {
      success: true,
      message: 'InvitationGroup deleted successfully',
      payload: invitationGroup,
    };
  } catch (error) {
    console.error('deleteInvitationGroup', error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export default {
  Query: {
    getInvitationGroup,
    getAllInvitationGroups,
  },
  Mutation: {
    createInvitationGroup,
    deleteInvitationGroup,
  },
};
