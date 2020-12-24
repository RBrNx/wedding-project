import { Schema } from 'mongoose';
import { InvitationType } from '../lib/enums';
import { mapEnumValues } from '../lib/helpers';

const { ObjectId } = Schema.Types;

const InvitationGroupSchema = new Schema({
  guests: [{ type: ObjectId, ref: 'User' }],
  type: { type: String, enum: mapEnumValues(InvitationType) },
});

export default InvitationGroupSchema;
