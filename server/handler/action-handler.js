const ActionConstant = require("../action/action-constant");
const ActionMessage = require("../action/action-message");

const handleConnect = require("./connect.handler");
const handleRegister = require("./register.handler");
const handleLogin = require("./login.handler");

module.exports = function(msg) {
  const action = ActionMessage.fromJson(JSON.parse(msg));
  console.log(action);
  switch (action.type) {
    case ActionConstant.TYPE.CONNECT:
      return handleConnect(action.data, action.socketId);
    case ActionConstant.TYPE.REGISTER:
      return handleRegister(action.data, action.socketId);
    case ActionConstant.TYPE.LOGIN:
      return handleLogin(action.data, action.socketId);
  }
};
