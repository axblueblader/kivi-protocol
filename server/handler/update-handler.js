const Key = require("../key");

const { UserDb } = require("../storage/user-database");
const SocketKeyStore = require("../storage/socket-key-store");
const UpdateAction = require("../action/update-action");
const ActionConstant = require("../action/action-constant");
const CommonConstant = require("../helper/common-constant");

const Result = require("../helper/result-builder");
module.exports = function(actionData, socketId) {
  let { info } = UpdateAction.fromJson(actionData);
  let username = SocketKeyStore.getUsername(socketId);
  UserDb.update(username, info);
  result = new Result().setType(ActionConstant.TYPE.UPDATE).setData({});
  return result;
};
