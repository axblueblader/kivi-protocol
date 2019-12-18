const crypto = require("crypto");

module.exports = {
  fromBase64: function(str) {
    const buffer = Buffer.from(str, "base64");
    return buffer.toString();
  },

  toBase64: function(str) {
    const buffer = Buffer.from(str);
    return buffer.toString("base64");
  },

  encryptWithRSAPubKey: function(pubKey, data) {
    return crypto.publicEncrypt(pubKey, Buffer.from(data)).toString("base64");
  },

  decryptWithRSAPriKey: function(priKey, data) {
    return crypto
      .privateDecrypt(priKey, Buffer.from(data, "base64"))
      .toString("utf8");
  }
};
