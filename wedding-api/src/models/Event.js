import { Schema } from 'mongoose';

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
});

export default EventSchema;
