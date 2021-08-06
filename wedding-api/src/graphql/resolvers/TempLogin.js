const fetchTempLoginCredentials = async (parent, { input }, { db }) => {
  try {
    const { invitationCode } = input;

    const InvitationGroupModel = db.model('InvitationGroup');
    const TempLoginDetailsModel = db.model('TempLoginDetails');

    const invitationGroup = await InvitationGroupModel.findOne({ invitationCode });
    const loginDetails = await TempLoginDetailsModel.find({ invitationGroup: invitationGroup._id }).populate('user');

    if (!loginDetails?.length)
      return {
        success: false,
        message: 'Cannot find login details',
      };

    if (loginDetails.some(details => details.disabled))
      return {
        success: false,
        message: 'This login is no longer valid',
      };

    return {
      success: true,
      message: 'Found temporary login details',
      payload: loginDetails,
    };
  } catch (error) {
    console.error('fetchTempLoginCredentials', error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export default {
  Mutation: {
    fetchTempLoginCredentials,
  },
};
