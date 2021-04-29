const updateSpotifyConfig = async (res, db, eventId) => {
  const { access_token: accessToken, scope, expires_in: expiresIn, refresh_token: refreshToken } = await res.json();

  const EventModel = db.model('Event');
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

  await EventModel.updateOne({ _id: eventId }, { spotifyConfig: { accessToken, refreshToken, scope, expiresAt } });

  return { accessToken, refreshToken, expiresAt };
};
