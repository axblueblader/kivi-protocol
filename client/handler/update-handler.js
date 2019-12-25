const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const chalk = require("chalk");
const exceptionWrapper = require("../helper/exception-wrapper");
const inquirer = require("../helper/inquirer");
module.exports = exceptionWrapper(async function(commandArgs) {
  const updateInfo = await inquirer.askInfo();
  const result = await ProtocolClient.update(updateInfo);
  if (result.status == CommonConstant.STATUS.SUCCESS) {
    console.log(chalk.greenBright("Update info successful"));
  }
});
