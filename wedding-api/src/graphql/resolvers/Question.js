import { QuestionGuestType } from '../../lib/enums';

const getRSVPQuestions = async (parent, args, { currentUser, db }) => {
  try {
    const QuestionModel = db.model('Question');
    const validInvitationTypes = [QuestionGuestType.BOTH, currentUser.invitationType];

    const questions = await QuestionModel.find({
      eventId: currentUser.eventId,
      isFollowUp: false,
    })
      .populate({
        path: 'followUpQuestions',
        populate: {
          path: 'question',
          model: 'Question',
        },
      })
      .exec();

    const filteredQuestions = questions.reduce((acc, currQuestion) => {
      if (currQuestion.followUpQuestions?.length) {
        // eslint-disable-next-line no-param-reassign
        currQuestion.followUpQuestions = currQuestion.followUpQuestions.filter(({ question }) =>
          validInvitationTypes.includes(question.guestType),
        );
      }

      if (validInvitationTypes.includes(currQuestion.guestType)) {
        acc.push(currQuestion);
      }

      return acc;
    }, []);

    return filteredQuestions;
  } catch (error) {
    console.error('getRSVPQuestions', error);
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
    console.error('createQuestion', error);
    return error;
  }
};

const updateQuestion = async (parent, args, { db }) => {
  const { id, question } = args;
  const { followUpQuestions, ...restOfQuestion } = question;

  try {
    const QuestionModel = db.model('Question');

    const existingQuestionDoc = await QuestionModel.findById(id);

    const questionDoc = await QuestionModel.findOneAndUpdate(
      { _id: id },
      {
        ...restOfQuestion,
        followUpQuestions: [
          ...existingQuestionDoc.followUpQuestions.filter(
            ({ question: q }) => q.toString() !== followUpQuestions?.[0]?.question,
          ),
          ...((followUpQuestions?.length && followUpQuestions) || []),
        ],
      },
      { new: true },
    );

    return {
      success: true,
      message: 'Question updated successfully',
      payload: questionDoc,
    };
  } catch (error) {
    console.error('updateQuestion', error);
    return error;
  }
};

const deleteQuestion = async (parent, { id }, { db }) => {
  try {
    const QuestionModel = db.model('Question');

    const questionDoc = await QuestionModel.findByIdAndDelete(id);

    await QuestionModel.updateMany({}, { $pull: { followUpQuestions: { question: id } } });

    return {
      success: true,
      message: 'Question deleted successfully',
      payload: questionDoc,
    };
  } catch (error) {
    console.error('deleteQuestion', error);
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
