const Key = require("../key");

const { UserDb } = require("../storage/user-database");
const SocketKeyStore = require("../storage/socket-key-store");
const LoginAction = require("../action/login-action");
const ActionConstant = require("../action/action-constant");
const CommonConstant = require("../helper/common-constant");

const Result = require("../helper/result-builder");
module.exports = function(actionData, socketId) {
  let { username, password } = LoginAction.fromJson(actionData);

  password = Key.decrypt(password);

  const userInfo = UserDb.find(username, { showPassword: true });
  let result;
  if (userInfo.password === password) {
    userInfo.online = true;
    UserDb.update(username, userInfo);
    SocketKeyStore.setUsername(socketId, username);

    console.log(userInfo);
    result = new Result().setType(ActionConstant.TYPE.LOGIN).setData({});
  } else {
    result = new Result()
      .setType(ActionConstant.TYPE.LOGIN)
      .setStatus(CommonConstant.STATUS.FAIL)
      .setData({ message: "Wrong username or password" });
  }
  return result;
};
