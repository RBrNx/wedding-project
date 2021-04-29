import { Schema } from 'mongoose';

const SpotifyConfigSchema = new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
  expiresAt: { type: Date },
  scope: { type: String },
});

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  spotifyConfig: { type: SpotifyConfigSchema },
});

export default EventSchema;
