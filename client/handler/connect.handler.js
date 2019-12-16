const CommonConstant = require("../helper/common-constant");
const Credential = require("../credential");
module.exports = function(action) {
  if (action.status == CommonConstant.STATUS.SUCCESS) {
    Credential.setServerPubKey(action.data.pubKey);
    console.log("Connect to server successful and recieved public key");
    return;
  }

  if (action.status == CommonConstant.STATUS.FAIL) {
    console.log("Failed to connect to server");
  }
};
