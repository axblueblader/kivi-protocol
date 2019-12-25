const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const chalk = require("chalk");
const exceptionWrapper = require("../helper/exception-wrapper");
module.exports = exceptionWrapper(async function(commandArgs) {
  let username = commandArgs[1];
  commandArgs.splice(0, 2);
  let options = commandArgs;
  const result = await ProtocolClient.info(username, options);
  if (result.status == CommonConstant.STATUS.SUCCESS) {
    let userInfo = result.data.userInfo;
    Object.keys(userInfo).forEach(key => {
      console.log(
        chalk.yellowBright(key + ": "),
        chalk.whiteBright(userInfo[key])
      );
    });
  }
});
