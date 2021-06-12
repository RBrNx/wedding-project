class RNBlob extends Blob {
  // eslint-disable-next-line class-methods-use-this
  get [Symbol.toStringTag]() {
    return 'Blob';
  }
}

export default RNBlob;
