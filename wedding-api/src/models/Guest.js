import { Schema, model } from 'mongoose';

const GuestSchema = new Schema({
  name: String,
  email: String,
  attending: Boolean,
  mainCourse: String,
});

export default GuestSchema;
