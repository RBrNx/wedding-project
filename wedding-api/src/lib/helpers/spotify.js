import fetch from 'node-fetch';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

const updateSpotifyConfig = async (res, db, eventId) => {
  const { access_token: accessToken, scope, expires_in: expiresIn, refresh_token: refreshToken } = await res.json();

  const EventModel = db.model('Event');
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

  const eventDoc = await EventModel.findById(eventId);

  eventDoc.spotifyConfig.set({
    ...eventDoc.spotifyConfig,
    accessToken,
    scope,
    expiresAt,
    refreshToken: refreshToken || eventDoc.spotifyConfig.refreshToken,
  });
  await eventDoc.save();

  return { accessToken, refreshToken, expiresAt };
};

const exchangeCodeForAccessToken = async code => {
  return fetch(tokenEndpoint, {
    method: 'POST',
    body: new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://851e7bcc3153.ngrok.io/spotifyCallback',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

const refreshAccessToken = async refreshToken => {
  return fetch(tokenEndpoint, {
    method: 'POST',
    body: new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export { updateSpotifyConfig, exchangeCodeForAccessToken, refreshAccessToken };
