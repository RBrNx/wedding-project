import { Schema } from 'mongoose';

const GuestSchema = new Schema({
  name: String,
  email: String,
  attending: Boolean,
  mainCourse: String,
});

const InvitationSchema = new Schema({
  uniqueCode: String,
  guests: [GuestSchema]
})

export { GuestSchema, InvitationSchema };
