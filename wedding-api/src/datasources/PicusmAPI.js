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
}

export default PicsumAPI;
