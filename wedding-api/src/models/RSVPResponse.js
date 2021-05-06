import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const AnswerSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const FormTupleSchema = new Schema(
  {
    question: { type: ObjectId, required: true, ref: 'Question' },
    answer: { type: AnswerSchema, required: true },
  },
  { _id: false },
);

const RSVPResponseSchema = new Schema({
  userId: { type: ObjectId, required: true, ref: 'User' },
  eventId: { type: ObjectId, required: true, ref: 'Event' },
  rsvpForm: [{ type: FormTupleSchema }],
});

export default RSVPResponseSchema;
