import { connectToDatabase } from '../../lib/database';
import { AttendanceStatus, QuestionType } from '../../lib/enums';

const getAllGuests = async () => {
  try {
    const db = await connectToDatabase();
    const GuestModel = db.model('Guest');

    const guests = await GuestModel.find().exec();

    return guests;
  } catch (error) {
    return error;
  }
};

const updateGuest = async (parent, args) => {
  try {
    const { input } = args;
    const { guestId, attending, mainCourse, email } = input;
    const db = await connectToDatabase();
    const GuestModel = db.model('Guest');

    const guest = await GuestModel.findOneAndUpdate(
      { _id: guestId },
      { attending, mainCourse, email },
      { new: true },
    ).exec();

    if (guest) return { success: true };
    return { success: false };
  } catch (error) {
    return error;
  }
};

const attending = async parent => {
  const { _id } = parent;

  const db = await connectToDatabase();
  const QuestionModel = db.model('Question');
  const AnswerModel = db.model('Answer');

  const attendanceQuestion = await QuestionModel.findOne({ type: QuestionType.ATTENDANCE });
  const answerDoc = await AnswerModel.findOne({ guestId: _id, questionId: attendanceQuestion._id });

  if (!answerDoc) return AttendanceStatus.AWAITING_RSVP;

  const { answer } = answerDoc;
  const userChoice = attendanceQuestion.choices.find(choice => choice._id.toString() === answer);

  return userChoice.value;
};

export default {
  queries: [
    { resolver: getAllGuests, authenticated: true },
    { resolver: attending, authenticated: true, root: 'Guest' },
  ],
  mutations: [{ resolver: updateGuest, authenticated: true }],
};
