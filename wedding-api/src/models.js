import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const GuestSchema = new Schema({
  name: String,
  email: String,
  attending: Boolean,
  mainCourse: String,
});

const InvitationSchema = new Schema({
  uniqueCode: String,
  guests: [{ type: ObjectId, ref: 'Guest' }]
})

export { GuestSchema, InvitationSchema };
