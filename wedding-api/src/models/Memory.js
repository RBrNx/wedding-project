import { Schema, Types } from 'mongoose';

const { ObjectId } = Types;

const MemorySchema = new Schema(
  {
    eventId: { type: ObjectId, required: true, ref: 'Event' },
    albumId: { type: String, required: true },
    photoId: { type: String, required: true },
    uploadedBy: { type: ObjectId, ref: 'User' },
    sortIndex: { type: Number, required: true },
    caption: { type: String },
    dominantColour: { type: String },
    url: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true },
);

export default MemorySchema;
