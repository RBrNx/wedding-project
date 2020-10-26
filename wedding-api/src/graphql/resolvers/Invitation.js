import { connectToDatabase } from '../../lib/database';

const getInvitation = async (parent, args, context) => {
  try {
    const { uniqueCode } = args;
    const db = await connectToDatabase();
    const InvitationSchema = db.model('Invitation');

    const invitation = await InvitationSchema.findOne({ uniqueCode }).populate('guests').exec();

    return invitation;
  } catch (error) {
    return error;
  }
};

const getAllInvitations = async (args, context) => {
  try {
    const db = await connectToDatabase();
    const InvitationSchema = db.model('Invitation');

    const invitations = await InvitationSchema.find().populate('guests').exec();

    return invitations;
  } catch (error) {
    return error;
  }
};

export default {
  queries: [
    { resolver: getInvitation },
    { resolver: getAllInvitations, authenticated: true },
  ],
  mutations: []
}