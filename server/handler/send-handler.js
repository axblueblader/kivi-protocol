const Key = require("../key");
const cryptor = require("../helper/cryptor");

const { UserDb, UserInfo } = require("../storage/user-database");
const SocketKeyStore = require("../storage/socket-key-store");
const SendAction = require("../action/send-action");
const ActionConstant = require("../action/action-constant");

const Result = require("../helper/result-builder");
module.exports = function(actionData, socketId) {
  let { receivers, message, useEncrypt } = SendAction.fromJson(actionData);
  if (useEncrypt) {
    message = Key.decrypt(message);
  }

  let sender = SocketKeyStore.getUsername(socketId);
  let receiverInfos = receivers.map(el => {
    socketId = SocketKeyStore.getSocketId(el);
    return {
      username: el,
      socket: SocketKeyStore.getSocket(socketId),
      pubKey: SocketKeyStore.getPubKey(socketId)
    };
  });

  let offline = [];
  let notFound = [];
  receiverInfos.forEach(receiver => {
    let usr = UserDb.find(receiver.username, { online: true });
    if (!usr) {
      notFound.push(receiver.username);
      return;
    }
    if (usr.online) {
      let sendMsg = message;
      if (useEncrypt) {
        sendMsg = Key.encrypt(message, receiver.pubKey);
      }
      const res = new Result().setType(ActionConstant.TYPE.RECEIVE).setData({
        date: new Date(),
        sender: sender,
        receiver: receiver.username,
        message: sendMsg,
        useEncrypt: useEncrypt
      });
      receiver.socket.write(res.getMessage());
    } else {
      offline.push(receiver.username);
    }
  });

  const result = new Result().setType(ActionConstant.TYPE.SEND).setData({
    offline: offline,
    notFound: notFound
  });
  return result;
};
