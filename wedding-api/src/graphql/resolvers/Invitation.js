import { connectToDatabase } from '../../lib/database';

const getInvitation = async (parent, args) => {
  try {
    const { uniqueCode } = args;
    const db = await connectToDatabase();
    const InvitationModel = db.model('Invitation');

    const invitation = await InvitationModel.findOne({ uniqueCode }).populate('guests').exec();

    return invitation;
  } catch (error) {
    return error;
  }
};

const getAllInvitations = async () => {
  try {
    const db = await connectToDatabase();
    const InvitationModel = db.model('Invitation');

    const invitations = await InvitationModel.find().populate('guests').exec();

    return invitations;
  } catch (error) {
    return error;
  }
};

export default {
  Query: {
    getInvitation,
    getAllInvitations,
  },
};
