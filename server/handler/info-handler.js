const Key = require("../key");

const { UserDb } = require("../storage/user-database");
const SocketKeyStore = require("../storage/socket-key-store");
const InfoAction = require("../action/info-action");
const ActionConstant = require("../action/action-constant");
const CommonConstant = require("../helper/common-constant");

const Result = require("../helper/result-builder");
module.exports = function(actionData, socketId) {
  let { username, options } = InfoAction.fromJson(actionData);
  let userInfo = UserDb.find(username, options);
  delete userInfo.password;
  result = new Result()
    .setType(ActionConstant.TYPE.INFO)
    .setData({ userInfo: userInfo });
  return result;
};
