import { Schema } from 'mongoose';
import { UserRole } from '../lib/enums';
import { mapEnumValues } from '../lib/helpers';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true, sparse: true },
  role: { type: String, required: true, enum: mapEnumValues(UserRole) },
});

export default UserSchema;
