import { Schema } from 'mongoose';
import { mapEnumValues } from '../lib/helpers';
import { QuestionType, QuestionResponseType, QuestionGuestType } from '../lib/enums';

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
    matchesValue: { type: String, required: true },
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
  placeholder: { type: String },
  choices: [{ type: ChoiceSchema }],
  specificGroups: [{ type: ObjectId, ref: 'Group' }],
  specificGuests: [{ type: ObjectId, ref: 'Guest' }],
  responseType: { type: String, enum: mapEnumValues(QuestionResponseType), required: true },
  guestType: { type: String, enum: mapEnumValues(QuestionGuestType), required: true },
  followUpQuestions: [{ type: FollowUpSchema }],
  order: { type: Number, required: true },
  isFollowUp: { type: Boolean, required: true },
});

export default QuestionSchema;
