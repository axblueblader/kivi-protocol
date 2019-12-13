const crypto = require("crypto");

class Key {
  constructor() {
    this._publicKey = undefined;
    this._privateKey = undefined;
  }

  gen() {
    if (this._privateKey && this._publicKey) {
      return;
    } else {
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

  getPubKey() {
    return this._publicKey;
  }

  encrypt(msg) {}

  decrypt(msg) {}
}

module.exports = new Key();
