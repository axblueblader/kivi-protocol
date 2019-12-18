const crypto = require("crypto");
const cryptor = require("./helper/cryptor");
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

  getPriKey() {
    return this._privateKey;
  }

  encrypt(msg, pubKey) {
    return cryptor.encryptWithRSAPubKey(pubKey, msg);
  }

  decrypt(msg) {
    return cryptor.decryptWithRSAPriKey(this._privateKey, msg);
  }
}

module.exports = new Key();
