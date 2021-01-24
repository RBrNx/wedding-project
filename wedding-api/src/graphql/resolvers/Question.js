import { connectToDatabase } from '../../lib/database';

const getRSVPQuestions = async (parent, args, { currentUser }) => {
  try {
    const db = await connectToDatabase();
    const QuestionModel = db.model('Question');

    const questions = await QuestionModel.find({ eventId: currentUser.eventId, isFollowUp: false })
      .populate({
        path: 'followUpQuestions',
        populate: {
          path: 'question',
          model: 'Question',
        },
      })
      .exec();

    return questions;
  } catch (error) {
    return error;
  }
};

const createQuestion = async (parent, args, { currentUser }) => {
  const { question } = args;

  try {
    const db = await connectToDatabase();
    const QuestionModel = db.model('Question');

    const questionDoc = new QuestionModel({ ...question, eventId: currentUser.eventId });
    await questionDoc.save();

    return {
      success: true,
      message: 'Question created successfully',
      payload: questionDoc,
    };
  } catch (error) {
    return error;
  }
};

const updateQuestion = async (parent, args) => {
  const { id, question } = args;

  try {
    const db = await connectToDatabase();
    const QuestionModel = db.model('Question');

    const questionDoc = await QuestionModel.findByIdAndUpdate(id, { ...question }, { new: true });

    return {
      success: true,
      message: 'Question updated successfully',
      payload: questionDoc,
    };
  } catch (error) {
    return error;
  }
};

const answerTextQuestion = async (parent, args) => {
  const { guestId, answerInput } = args;
  const { questionId, answer } = answerInput;

  try {
    const db = await connectToDatabase();
    const AnswerModel = db.model('Answer');

    const answerDoc = new AnswerModel({
      questionId,
      guestId,
      answer,
    });
    await answerDoc.save();

    return {
      success: true,
      message: 'Answer created successfully',
    };
  } catch (error) {
    return error;
  }
};

const answerChoiceQuestion = async (parent, args) => {
  const { guestId, answerInput } = args;
  const { questionId, answer } = answerInput;

  try {
    const db = await connectToDatabase();
    const AnswerModel = db.model('Answer');

    const answerDoc = new AnswerModel({
      questionId,
      guestId,
      answer,
    });
    await answerDoc.save();

    return {
      success: true,
      message: 'Answer created successfully',
    };
  } catch (error) {
    return error;
  }
};

export default {
  Query: {
    getRSVPQuestions,
  },
  Mutation: {
    createQuestion,
    updateQuestion,
    answerTextQuestion,
    answerChoiceQuestion,
  },
};
