import { Schema } from 'mongoose';
import { InvitationType } from '../lib/enums';
import { mapEnumValues } from '../lib/helpers';

const { ObjectId } = Schema.Types;

const InvitationSchema = new Schema({
  uniqueCode: String,
  guests: [{ type: ObjectId, ref: 'Guest' }],
  type: { type: String, enum: mapEnumValues(InvitationType) },
});

export default InvitationSchema;
