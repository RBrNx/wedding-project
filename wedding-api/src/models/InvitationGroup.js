import { Schema } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { nolookalikes } from 'nanoid-dictionary';
import { InvitationType } from '../lib/enums';
import { mapEnumValues } from '../lib/helpers';

const { ObjectId } = Schema.Types;
const nanoid = customAlphabet(nolookalikes, 12);

const InvitationGroupSchema = new Schema({
  guests: [{ type: ObjectId, ref: 'User' }],
  type: { type: String, enum: mapEnumValues(InvitationType) },
  invitationCode: { type: String, required: true, unique: true, default: () => nanoid(12) },
});

export default InvitationGroupSchema;
