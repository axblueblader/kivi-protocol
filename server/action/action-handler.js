const ActionConstant = require("./action-constant");

const ConnectHandler = require("./connect.handler");
module.exports = function(msg) {
  const actionType = String(msg.split(" ", 1)[0]).toLowerCase();
  switch (actionType) {
    case ActionConstant.TYPE.CONNECT:
      return ConnectHandler(msg);
  }
};
