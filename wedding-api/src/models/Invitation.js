import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const InvitationSchema = new Schema({
  uniqueCode: String,
  guests: [{ type: ObjectId, ref: 'Guest' }],
  type: { type: String, enum: ['DAYTIME', 'EVENING'] },
});

export default InvitationSchema;
