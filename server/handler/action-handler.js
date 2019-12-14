const ActionConstant = require("../action/action-constant");
const ConnectHandler = require("./connect.handler");
const ActionMessage = require("../action/action-message");
const encoder = require("../helper/encoder");
module.exports = function(msg) {
  const action = ActionMessage.fromJson(JSON.parse(msg));
  console.log(action);
  switch (action.type) {
    case ActionConstant.TYPE.CONNECT:
      return ConnectHandler(action.data, action.socketId);
  }
};
