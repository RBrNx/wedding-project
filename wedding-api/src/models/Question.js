import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const ChoiceSchema = new Schema({
  text: String
}, {
  _id: true
})

const FollowUpSchema = new Schema({
  to: { type: ObjectId, ref: 'Question' },
  matchesChoice: { type: ObjectId, ref: 'Answer' }
}, {
  _id: false
})

const QuestionSchema = new Schema({
  type: { type: String, enum: ['ATTENDANCE', 'MULTIPLE_CHOICE', 'TEXT'], required: true },
  title: { type: String, required: true },
  label: { type: String },
  choices: [{ type: ChoiceSchema }],
  specificGroups: [{ type: ObjectId, ref: 'Group' }],
  specificGuests: [{ type: ObjectId, ref: 'Guest' }],
  responseType: { type: String, enum: ['INDIVIDUAL', 'HOUSEHOLD'], required: true },
  followUp: { type: FollowUpSchema }
});

export default QuestionSchema;