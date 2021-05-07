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

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  spotifyConfig: { type: SpotifyConfigSchema },
});

export default EventSchema;
