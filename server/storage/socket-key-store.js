class SocketKeyStore {
  constructor() {
    this._idInfoMap = {};
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

  getSocketId(username) {
    let res = Object.keys(this._idInfoMap).filter(el => {
      return this._idInfoMap[el].username == username;
    });
    // console.log(res);
    return res[0];
  }

  setSocket(socketId, socket) {
    if (!this._idInfoMap[socketId]) {
      this._idInfoMap[socketId] = {};
    }
    this._idInfoMap[socketId].socket = socket;
  }

  getSocket(socketId) {
    if (!this._idInfoMap[socketId]) {
      return undefined;
    }
    return this._idInfoMap[socketId].socket;
  }

  getSocketIdByHostPort(host, port) {
    let res = Object.keys(this._idInfoMap).filter(el => {
      return (
        this._idInfoMap[el].socket.remoteAddress == host &&
        this._idInfoMap[el].socket.remotePort == port
      );
    });
    // console.log(res);
    return res[0];
  }

  delete(socketId) {
    delete this._idInfoMap[socketId];
  }
}

module.exports = new SocketKeyStore();
