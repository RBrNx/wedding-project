import { Types } from 'mongoose';

const { ObjectId } = Types;

const getRSVPQuestions = async (parent, args, { currentUser, db }) => {
  try {
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

const createQuestion = async (parent, args, { currentUser, db }) => {
  const { question } = args;

  try {
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

const updateQuestion = async (parent, args, { db }) => {
  const { id, question } = args;
  const { followUpQuestions } = question;

  try {
    const QuestionModel = db.model('Question');

    const query = {
      _id: id,
      ...(followUpQuestions?.length && {
        'followUpQuestions.question': ObjectId(followUpQuestions[0].question),
      }),
    };

    const questionDoc = await QuestionModel.findOneAndUpdate(
      query,
      {
        $set: {
          ...question,
          ...(followUpQuestions?.length && { 'followUpQuestions.$': followUpQuestions[0] }),
        },
      },
      { new: true },
    );

    return {
      success: true,
      message: 'Question updated successfully',
      payload: questionDoc,
    };
  } catch (error) {
    return error;
  }
};

const deleteQuestion = async (parent, { id }, { db }) => {
  try {
    const QuestionModel = db.model('Question');

    const questionDoc = await QuestionModel.findByIdAndDelete(id);

    return {
      success: true,
      message: 'Question deleted successfully',
      payload: questionDoc,
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
    deleteQuestion,
  },
};
