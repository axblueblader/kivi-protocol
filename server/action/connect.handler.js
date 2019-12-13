const Key = require("../key");
const encoder = require("../helper/encoder");
const SocketKeyStore = require("../storage/socket-key-store");
module.exports = function(msg, socketId) {
  const args = msg.split(" ");
  SocketKeyStore.putPubKey(socketId, args[4]);
  const pubKey = encoder.toBase64(Key.getPubKey());
  const result = pubKey;
  return result;
};
