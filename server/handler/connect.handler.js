const Key = require("../key");

const SocketKeyStore = require("../storage/socket-key-store");
const ConnectAction = require("../action/connect-action");
const encoder = require("../helper/encoder");

const Result = require("../helper/result-builder");
module.exports = function(actionData, socketId) {
  const data = ConnectAction.fromJson(actionData);
  console.log(data);
  SocketKeyStore.putPubKey(socketId, data.pubKey);
  const pubKey = Key.getPubKey();
  const result = new Result().setData({ pubKey: pubKey });
  return result;
};
