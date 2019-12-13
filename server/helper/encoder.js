module.exports = {
  fromBase64: function(str) {
    const buffer = Buffer.from(str, "base64");
    return buffer.toString();
  },

  toBase64: function(str) {
    const buffer = Buffer.from(str);
    return buffer.toString("base64");
  }
};
