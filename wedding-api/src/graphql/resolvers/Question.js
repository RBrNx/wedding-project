import { connectToDatabase } from '../../lib/database';

const createQuestion = async (parent, args) => {
  const { question } = args;

  try {
    const db = await connectToDatabase();
    const QuestionModel = db.model('Question');

    const questionDoc = new QuestionModel(question);
    await questionDoc.save();

    return {
      success: true,
      feedback: 'Question created successfully',
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
      feedback: 'Answer created successfully',
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
      feedback: 'Answer created successfully',
    };
  } catch (error) {
    return error;
  }
};

export default {
  queries: [],
  mutations: [
    { resolver: createQuestion, authenticated: true },
    { resolver: answerTextQuestion },
    { resolver: answerChoiceQuestion },
  ],
};
