import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const GuestSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  attending: { type: String, enum: ['AWAITING_RSVP', 'ATTENDING', 'NOT_ATTENDING'] },
  mainCourse: String,
});

const InvitationSchema = new Schema({
  uniqueCode: String,
  guests: [{ type: ObjectId, ref: 'Guest' }],
  type: { type: String, enum: ['DAYTIME', 'EVENING'] },
});

export { GuestSchema, InvitationSchema };
