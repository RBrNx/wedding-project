import { connectToDatabase } from '../lib/database';
import { exchangeCodeForAccessToken, updateSpotifyConfig } from '../lib/helpers/spotify';

const { EVENT_ID } = process.env;

exports.authCallback = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { code, error } = event.queryStringParameters;

    if (error) throw new Error('An error occurred during Authorization');

    const res = await exchangeCodeForAccessToken(code);

    if (!res.ok) throw new Error('Token exchange failed');

    const db = await connectToDatabase();
    await updateSpotifyConfig(res, db, EVENT_ID);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully authenticated with Spotify!`,
      }),
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message,
      }),
    });
  }
};
