import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const AnswerSchema = new Schema({
  questionId: { type: ObjectId, ref: 'Question', required: true },
  guestId: { type: ObjectId, ref: 'Guest', required: true },
  answer: { type: String, required: true },
});

export default AnswerSchema;
