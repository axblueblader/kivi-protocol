const crypto = require("crypto");
const uuidV1 = require("uuid/v1");

class Key {
  constructor() {
    this._publicKey = undefined;
    this._privateKey = undefined;
    this._socketId = undefined;
  }

  gen() {
    if (!this._privateKey || !this._publicKey) {
      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem"
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem"
        }
      });
      this._privateKey = privateKey;
      this._publicKey = publicKey;
    }

    if (!this._socketId) {
      this._socketId = uuidV1();
    }
  }

  getPubKey() {
    return this._publicKey;
  }

  getSocketId() {
    return this._socketId;
  }

  encrypt(msg) {}

  decrypt(msg) {}
}

module.exports = new Key();
