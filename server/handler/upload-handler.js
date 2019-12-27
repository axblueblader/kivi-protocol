const Key = require("../key");

const { UserDb, UserInfo } = require("../storage/user-database");
const SocketKeyStore = require("../storage/socket-key-store");
const UploadAction = require("../action/upload-action");
const ActionConstant = require("../action/action-constant");
const File = require("../helper/file");

const Result = require("../helper/result-builder");

const uploadJobMap = {};

class UploadJob {
  constructor(finalPath) {
    this.chunks = {};
    this.path = finalPath;
  }

  async process(content, chunkNo, useEncrypt) {
    if (useEncrypt) {
      content = Key.decrypt(content);
    }
    this.chunks[chunkNo] = content;
  }

  async finish() {
    let content = Object.keys(this.chunks)
      .sort()
      .reduce((fullContent, chunkNo) => {
        return fullContent + this.chunks[chunkNo];
      }, "");
    await File.makeDir(this.path);
    await File.write(this.path, Buffer.from(content));
    delete this.chunks;
    this.chunks = {};
  }
}
module.exports = async function(actionData, socketId) {
  let { filePath, content, useEncrypt, chunkNo, done } = UploadAction.fromJson(
    actionData
  );
  let username = SocketKeyStore.getUsername(socketId);
  const finalPath = File.makePath(filePath, username);
  let result = new Result().setType(ActionConstant.TYPE.UPLOAD).setData({});
  let jobKey = finalPath;
  if (!uploadJobMap[jobKey]) {
    uploadJobMap[jobKey] = new UploadJob(finalPath);
  }
  uploadJobMap[jobKey].process(content, chunkNo, useEncrypt);
  if (done) {
    uploadJobMap[jobKey].finish();
    result.setData({ done: true });
  }

  return result;
};
