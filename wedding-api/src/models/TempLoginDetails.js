import { Schema, Types } from 'mongoose';
import { nanoid } from 'nanoid';

const { ObjectId } = Types;

const TempLoginDetailsSchema = new Schema({
  userId: { type: ObjectId, required: true, ref: 'User' },
  shortId: { type: String, required: true, unique: true, default: () => nanoid(12) },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default TempLoginDetailsSchema;
