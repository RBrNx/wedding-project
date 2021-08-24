import { Schema } from 'mongoose';

const SpotifyConfigSchema = new Schema(
  {
    clientId: { type: String, required: true },
    clientSecret: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    scope: { type: String },
    playlistId: { type: String },
  },
  { _id: false },
);

const AddressSchema = new Schema(
  {
    town: { type: String, required: true },
    country: { type: String, required: true },
    postcode: { type: String, required: true },
  },
  { _id: false },
);

const LocationSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false },
);

const VenueSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: LocationSchema, required: true },
    image: { type: String, required: true },
  },
  { _id: false },
);

const ScheduleItemSchema = new Schema(
  {
    time: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false },
);

const MenuChoiceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const MenuCourseSchema = new Schema(
  {
    name: { type: String, required: true },
    choices: { type: [MenuChoiceSchema], required: true },
    info: { type: String },
  },
  { _id: false },
);

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  spotifyConfig: { type: SpotifyConfigSchema },
  venue: { type: VenueSchema },
  schedule: { type: [ScheduleItemSchema] },
  menu: { type: [MenuCourseSchema] },
});

export default EventSchema;
