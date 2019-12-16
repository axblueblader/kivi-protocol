const Key = require("../key");

const SocketKeyStore = require("../storage/socket-key-store");
const ConnectAction = require("../action/connect-action");
const ActionConstant = require("../action/action-constant");

const Result = require("../helper/result-builder");
module.exports = function(actionData, socketId) {
  const data = ConnectAction.fromJson(actionData);
  SocketKeyStore.putPubKey(socketId, data.pubKey);
  const pubKey = Key.getPubKey();
  const result = new Result()
    .setType(ActionConstant.TYPE.CONNECT)
    .setData({ pubKey: pubKey });
  return result;
};
