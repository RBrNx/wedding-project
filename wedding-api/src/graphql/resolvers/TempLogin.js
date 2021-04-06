const fetchTempLoginCredentials = async (parent, { input }, { db }) => {
  try {
    const { invitationId } = input;

    const TempLoginDetailsModel = db.model('TempLoginDetails');

    const loginDetails = await TempLoginDetailsModel.findOne({ invitationId });

    if (!loginDetails)
      return {
        success: false,
        message: 'Cannot find login details',
      };

    if (loginDetails.disabled)
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
