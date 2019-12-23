const Key = require("../key");

const { UserDb, UserInfo } = require("../storage/user-database");
const SocketKeyStore = require("../storage/socket-key-store");
const UploadAction = require("../action/upload-action");
const ActionConstant = require("../action/action-constant");
const File = require("../helper/file");

const Result = require("../helper/result-builder");
module.exports = async function(actionData, socketId) {
  let { filePath, content, useEncrypt, checksum } = UploadAction.fromJson(
    actionData
  );
  let username = SocketKeyStore.getUsername(socketId);

  const finalPath = File.makePath(filePath, username);

  await File.makeDir(finalPath);
  await File.write(finalPath, Buffer.from(content));

  if (useEncrypt) {
    content = Key.decrypt(content);
  }

  const result = new Result().setType(ActionConstant.TYPE.UPLOAD).setData({});
  return result;
};
