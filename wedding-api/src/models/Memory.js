import { Schema, Types } from 'mongoose';

const { ObjectId } = Types;

const MemorySchema = new Schema(
  {
    eventId: { type: ObjectId, required: true, ref: 'Event' },
    albumId: { type: String, required: true },
    photoId: { type: String, required: true },
    url: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true },
);

export default MemorySchema;
