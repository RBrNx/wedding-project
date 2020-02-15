import { Schema } from 'mongoose';

const GuestSchema = new Schema({
  name: String,
  email: String,
  attending: Boolean,
  mainCourse: String,
});

const Guest = conn => conn.model('guests', GuestSchema);

export default Guest;
