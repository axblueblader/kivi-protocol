const ActionConstant = require("../action/action-constant");
const handleConnect = require("./connect.handler");
const ActionResult = require("../action/action-result");
module.exports = function(msg) {
  const action = ActionResult.fromJson(JSON.parse(msg));
  console.log(action);
  switch (action.type) {
    case ActionConstant.TYPE.CONNECT:
      return handleConnect(action);
  }
};
