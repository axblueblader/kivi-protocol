const Key = require("../key");
const encoder = require("../helper/encoder");
module.exports = function(msg) {
  const args = msg.split(" ");
  const socPubKey = encoder.fromBase64(args[4]);
  const pubKey = encoder.toBase64(Key.getPubKey());
  const result = pubKey;
  return result;
};
