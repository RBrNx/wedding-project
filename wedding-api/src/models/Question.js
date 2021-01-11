import { Schema } from 'mongoose';
import { mapEnumValues } from '../lib/helpers';
import { QuestionType, QuestionResponseType } from '../lib/enums';

const { ObjectId } = Schema.Types;

const ChoiceSchema = new Schema(
  {
    label: String,
    value: String,
  },
  {
    _id: true,
  },
);

const FollowUpSchema = new Schema(
  {
    question: { type: ObjectId, ref: 'Question', required: true },
    matchesChoice: { type: ObjectId, required: true },
    order: { type: Number, required: true },
  },
  {
    _id: false,
  },
);

const QuestionSchema = new Schema({
  eventId: { type: ObjectId, required: true, ref: 'Event' },
  type: { type: String, enum: mapEnumValues(QuestionType), required: true },
  title: { type: String, required: true },
  label: { type: String },
  choices: [{ type: ChoiceSchema }],
  specificGroups: [{ type: ObjectId, ref: 'Group' }],
  specificGuests: [{ type: ObjectId, ref: 'Guest' }],
  responseType: { type: String, enum: mapEnumValues(QuestionResponseType), required: true },
  followUpQuestions: [{ type: FollowUpSchema }],
});

export default QuestionSchema;
