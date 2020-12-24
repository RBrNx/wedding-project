import { connectToDatabase } from '../../lib/database';

const getInvitationGroup = async (parent, { id }) => {
  try {
    const db = await connectToDatabase();
    const InvitationGroupModel = db.model('InvitationGroup');

    const invitationGroup = await InvitationGroupModel.findBbyId(id).populate('guests').exec();

    return invitationGroup;
  } catch (error) {
    return error;
  }
};

const getAllInvitationGroups = async () => {
  try {
    const db = await connectToDatabase();
    const InvitationGroupModel = db.model('Invitation');

    const invitationGroups = await InvitationGroupModel.find().populate('guests').exec();

    return invitationGroups;
  } catch (error) {
    return error;
  }
};

export default {
  Query: {
    getInvitationGroup,
    getAllInvitationGroups,
  },
};
