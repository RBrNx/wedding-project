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

export default {
  queries: [],
  mutations: [{ resolver: createQuestion, authenticated: true }],
};
