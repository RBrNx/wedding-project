import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const QuestionSchema = new Schema({
  type: { type: String, enum: ['ATTENDANCE', 'MULTIPLE_CHOICE', 'TEXT'], required: true },
  title: { type: String, required: true },
  label: { type: String },
  choices: [{ type: String }],
  specificGroups: [{ type: ObjectId, ref: 'Group' }],
  specificGuests: [{ type: ObjectId, ref: 'Guest' }],
  responseType: { type: String, enum: ['INDIVIDUAL', 'HOUSEHOLD'], required: true }
});

export default QuestionSchema;