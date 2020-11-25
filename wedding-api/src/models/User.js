import { Schema, Types } from 'mongoose';
import { UserRole } from '../lib/enums';
import { mapEnumValues } from '../lib/helpers';

const { ObjectId } = Types;

const UserSchema = new Schema({
  eventId: { type: ObjectId, required: true, ref: 'Event' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: false, unique: true, sparse: true },
  role: { type: String, required: true, enum: mapEnumValues(UserRole) },
});

export default UserSchema;
