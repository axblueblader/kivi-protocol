const Key = require("../key");
const cryptor = require("../helper/cryptor");

const { UserDb, UserInfo } = require("../storage/user-database");
const RegisterAction = require("../action/register-action");
const ActionConstant = require("../action/action-constant");

const Result = require("../helper/result-builder");
module.exports = function(actionData, socketId) {
  let { username, password, useEncrypt } = RegisterAction.fromJson(actionData);
  if (useEncrypt) {
    password = Key.decrypt(password);
  }
  const userInfo = new UserInfo();
  userInfo.username = username;
  userInfo.password = password;
  userInfo.date = new Date();

  UserDb.create(username, userInfo);
  console.log(userInfo);
  const result = new Result().setType(ActionConstant.TYPE.REGISTER).setData({});
  return result;
};
