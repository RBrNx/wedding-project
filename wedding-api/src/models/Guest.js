import { Schema } from 'mongoose';

const GuestSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  attending: { type: String, enum: ['AWAITING_RSVP', 'ATTENDING', 'NOT_ATTENDING'] },
  mainCourse: String,
});

export default GuestSchema;
