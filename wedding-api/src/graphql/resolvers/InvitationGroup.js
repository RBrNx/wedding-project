const getInvitationGroup = async (parent, { id }, { db }) => {
  try {
    const InvitationGroupModel = db.model('InvitationGroup');

    const invitationGroup = await InvitationGroupModel.findBbyId(id).populate('guests').exec();

    return invitationGroup;
  } catch (error) {
    return error;
  }
};

const getAllInvitationGroups = async (parent, args, { db }) => {
  try {
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
