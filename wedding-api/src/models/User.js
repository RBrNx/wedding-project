import { Schema, Types } from 'mongoose';
import { InvitationType, UserRole } from '../lib/enums';
import { mapEnumValues } from '../lib/helpers';

const { ObjectId } = Types;

const UserSchema = new Schema({
  cognitoUserId: { type: String, required: false, unique: true },
  eventId: { type: ObjectId, required: true, ref: 'Event' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: false, unique: true, sparse: true },
  role: { type: String, required: true, enum: mapEnumValues(UserRole) },
  invitationType: { type: String, required: true, enum: mapEnumValues(InvitationType) },
  pushNotificationToken: { type: String, required: false },
});

UserSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

export default UserSchema;
