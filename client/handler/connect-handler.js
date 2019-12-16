const ApiClient = require("../api-client");
const CommonConstant = require("../helper/common-constant");
const Credential = require("../credential");
const chalk = require("chalk");
module.exports = async function(commandArgs) {
  const result = await ApiClient.connect(commandArgs[1], commandArgs[2]);
  if (result.status == CommonConstant.STATUS.SUCCESS) {
    Credential.setServerPubKey(result.data.pubKey);
    console.log(
      chalk.greenBright("Connect successful, retrieved server's public key")
    );
  }
};
