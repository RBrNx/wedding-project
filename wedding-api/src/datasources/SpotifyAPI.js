import { RESTDataSource } from 'apollo-datasource-rest';
import { refreshAccessToken, updateSpotifyConfig } from '../lib/helpers/spotify';

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = null;
  }

  // eslint-disable-next-line class-methods-use-this
  mapIncomingTrackData(tracks) {
    return tracks.map(track => {
      const artists = track.artists.map(artist => artist.name);
      const albumArt = track.album.images.reduce((accumulator, image) => {
        return image.height < accumulator.height ? image : accumulator;
      });

      return {
        id: track.id,
        href: track.href,
        uri: track.uri,
        name: track.name,
        artists,
        albumArt: albumArt?.url,
        album: track.album.name,
      };
    });
  }

  async getValidToken(db, eventId) {
    if (!this.accessToken) {
      const EventModel = db.model('Event');
      const { spotifyConfig } = await EventModel.findById(eventId);

      this.refreshToken = spotifyConfig.refreshToken;
      this.expiresAt = spotifyConfig.expiresAt;
      this.accessToken = spotifyConfig.accessToken;
    }

    if (this.expiresAt <= new Date()) {
      const res = await refreshAccessToken(this.refreshToken);
      const { accessToken, refreshToken, expiresAt } = await updateSpotifyConfig(res, db, eventId);
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.expiresAt = expiresAt;
    }
  }

  async willSendRequest(request) {
    const { currentUser, db } = this.context;
    await this.getValidToken(db, currentUser.eventId);

    request.headers.set('Authorization', `Bearer ${this.accessToken}`);
  }

  async searchTracks({ searchTerm }) {
    const { tracks } = await this.get('search', {
      q: searchTerm,
      type: 'track',
    });
    tracks.items = this.mapIncomingTrackData(tracks.items);

    return tracks;
  }
}

export default SpotifyAPI;
