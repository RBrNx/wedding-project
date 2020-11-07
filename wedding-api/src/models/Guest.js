import { Schema } from 'mongoose';
import { AttendanceStatus } from '../lib/enums';
import { mapEnumValues } from '../lib/helpers';

const GuestSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  attending: { type: String, enum: mapEnumValues(AttendanceStatus) },
  // mainCourse: String,
});

export default GuestSchema;
