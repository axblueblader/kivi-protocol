const ActionConstant = require("./action-constant");

const ConnectHandler = require("./connect.handler");
module.exports = function(msg, socketId) {
  const actionType = String(
    msg.split(" ", 3)[ActionConstant.POSITION_IN_MSG]
  ).toLowerCase();
  switch (actionType) {
    case ActionConstant.TYPE.CONNECT:
      return ConnectHandler(msg, socketId);
  }
};
