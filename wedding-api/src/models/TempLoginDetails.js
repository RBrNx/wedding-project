import { Schema, Types } from 'mongoose';
import { nanoid } from 'nanoid';

const { ObjectId } = Types;

const TempLoginDetailsSchema = new Schema({
  user: { type: ObjectId, required: true, ref: 'User' },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  disabled: { type: Boolean, required: true, default: false },
});

export default TempLoginDetailsSchema;
