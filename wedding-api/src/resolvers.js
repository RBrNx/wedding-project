import { connectToDatabase } from './lib/database';

const hello = (args, context) => {
  return 'Your GraphQL API is now LIVE!🎈 ';
};

const getAllGuests = async (args, context) => {
  try {
    const db = await connectToDatabase();
    const GuestSchema = db.model('Guest');
  
    const guests = await GuestSchema.find().exec();
  
    return guests;
  } catch (error) {
    return error;
  }
};

const getAllInvitations = async (args, context) => {
  try {
    const db = await connectToDatabase();
    const InvitationSchema = db.model('Invitation');
  
    const invitations = await InvitationSchema.find()
      .populate('guests')
      .exec();
  
    return invitations;
  } catch (error) {
    return error;
  }
};

const getInvitation = async (parent, args, context) => {
  try {
    const { uniqueCode } = args;
    const db = await connectToDatabase();
    const InvitationSchema = db.model('Invitation');
  
    const invitation = await InvitationSchema.findOne({ uniqueCode }).populate('guests').exec()
  
    return invitation;
  }
  catch(error){
    return error;
  }
}

const updateGuest = async (parent, args, context) => {
  try{
    const { input } = args;
    const {  guestId, attending, mainCourse, email } = input;
    const db = await connectToDatabase();
    const GuestSchema = db.model('Guest');

    const guest = await GuestSchema.findOneAndUpdate({ _id: input.guestId }, { attending, mainCourse, email }, { new: true }).exec();

    if(guest) return { success: true }
    return { success: false }
  }
  catch(error){
    return error;
  }
}

export default {
  Query: {
    hello,
    getAllGuests,
    getAllInvitations,
    getInvitation
  },
  Mutation: {
    updateGuest
  }
};
