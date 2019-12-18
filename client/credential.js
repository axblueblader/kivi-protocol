const crypto = require("crypto");
const cryptor = require("./helper/cryptor");
const uuidV1 = require("uuid/v1");

class Credential {
  constructor() {
    this._publicKey = undefined;
    this._privateKey = undefined;
    this._socketId = undefined;
    this._serverPubKey = undefined;
    this._currentUser = undefined;
  }

  genKey() {
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
  }

  genSocId() {
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

  setServerPubKey(pubKey) {
    this._serverPubKey = pubKey;
  }

  getServerPubKey(pubKey) {
    return this._serverPubKey;
  }

  encrypt(msg) {
    return cryptor.encryptWithRSAPubKey(this._serverPubKey, msg);
  }

  decrypt(msg) {
    return cryptor.decryptWithRSAPriKey(this._privateKey, msg);
  }

  setCurrentUser(username) {
    this._currentUser = username;
  }

  getCurrentUser() {
    return this._currentUser;
  }
}

module.exports = new Credential();
