import { RESTDataSource } from 'apollo-datasource-rest';

class PicsumAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://picsum.photos/v2/';
  }

  // eslint-disable-next-line class-methods-use-this
  mapIncomingImageData(images) {
    return images.map(image => ({
      ...image,
      downloadUrl: image.download_url,
    }));
  }

  async listImages({ page, limit }) {
    const images = await this.get('list', { page, limit });

    return this.mapIncomingImageData(images);
  }

  async listImagesAsAlbums({ page, limit }) {
    const album = [];
    const max = 5;
    const min = 1;
    const images = await this.get('list', { page, limit: limit * 2 });

    while (images.length > 0) {
      const size = Math.min(max, Math.floor(Math.random() * max + min));
      album.push({ images: this.mapIncomingImageData(images.splice(0, size)) });
    }

    return album;
  }
}

export default PicsumAPI;
