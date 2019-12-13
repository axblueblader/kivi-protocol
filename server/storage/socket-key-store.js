class StorageKeyStore {
  constructor() {
    this._idPubKeyMap = {};
  }

  putPubKey(socketId, pubKey) {
    this._idPubKeyMap[socketId] = pubKey;
  }

  getPubKey(socketId) {
    return this._idPubKeyMap[socketId];
  }
}

module.exports = new StorageKeyStore();
