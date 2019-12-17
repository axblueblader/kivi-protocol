class SocketKeyStore {
  constructor() {
    this._idInfoMap = {};
    this._username = undefined;
  }

  putPubKey(socketId, pubKey) {
    if (!this._idInfoMap[socketId]) {
      this._idInfoMap[socketId] = {};
    }
    this._idInfoMap[socketId].pubKey = pubKey;
  }

  getPubKey(socketId) {
    if (!this._idInfoMap[socketId]) {
      return undefined;
    }
    return this._idInfoMap[socketId].pubKey;
  }

  setUsername(socketId, username) {
    if (!this._idInfoMap[socketId]) {
      this._idInfoMap[socketId] = {};
    }
    this._idInfoMap[socketId].username = username;
  }

  getUsername(socketId) {
    if (!this._idInfoMap[socketId]) {
      return undefined;
    }
    return this._idInfoMap[socketId].username;
  }
}

module.exports = new SocketKeyStore();
