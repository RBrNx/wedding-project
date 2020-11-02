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
    to: { type: ObjectId, ref: 'Question' },
    matchesChoice: { type: ObjectId, ref: 'Answer' },
  },
  {
    _id: false,
  },
);

const QuestionSchema = new Schema({
  type: { type: String, enum: mapEnumValues(QuestionType), required: true },
  title: { type: String, required: true },
  label: { type: String },
  choices: [{ type: ChoiceSchema }],
  specificGroups: [{ type: ObjectId, ref: 'Group' }],
  specificGuests: [{ type: ObjectId, ref: 'Guest' }],
  responseType: { type: String, enum: mapEnumValues(QuestionResponseType), required: true },
  followUp: { type: FollowUpSchema },
});

export default QuestionSchema;
