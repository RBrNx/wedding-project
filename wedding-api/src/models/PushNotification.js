import { Schema, Types } from 'mongoose';

const { ObjectId } = Types;

const ReceiptSchema = new Schema(
  {
    status: { type: String, required: true },
    id: { type: String, required: false },
    message: { type: String, required: false },
    details: { type: String, required: false },
  },
  { _id: false },
);

const PushNotificationSchema = new Schema(
  {
    eventId: { type: ObjectId, required: true, ref: 'Event' },
    recipients: { type: [String], required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    data: { type: String, required: false },
    receipts: { type: [ReceiptSchema], required: false },
  },
  { timestamps: true },
);

export default PushNotificationSchema;
