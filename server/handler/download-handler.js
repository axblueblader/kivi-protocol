const Key = require("../key");

const { UserDb, UserInfo } = require("../storage/user-database");
const SocketKeyStore = require("../storage/socket-key-store");
const DownloadAction = require("../action/download-action");
const ActionConstant = require("../action/action-constant");
const File = require("../helper/file");

const Result = require("../helper/result-builder");
module.exports = async function(actionData, socketId) {
  let { filePath, useEncrypt, checksum } = DownloadAction.fromJson(actionData);
  let username = SocketKeyStore.getUsername(socketId);

  const finalPath = File.makePath(filePath, username);
  const content = await File.read(finalPath);

  if (useEncrypt) {
    content = Key.encrypt(content, Key.getPubKey());
  }

  const result = new Result().setType(ActionConstant.TYPE.DOWNLOAD).setData({
    content: content,
    useEncrypt: useEncrypt
  });
  return result;
};
