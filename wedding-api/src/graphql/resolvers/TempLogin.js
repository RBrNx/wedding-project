import { connectToDatabase } from '../../lib/database';

const fetchTempLoginCredentials = async (parent, { input }) => {
  try {
    const { shortId } = input;

    const db = await connectToDatabase();
    const TempLoginDetailsModel = db.model('TempLoginDetails');

    const loginDetails = await TempLoginDetailsModel.findOne({ shortId });

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
