const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const chalk = require("chalk");
const inquirer = require("../helper/inquirer");
const exceptionWrapper = require("../helper/exception-wrapper");
module.exports = exceptionWrapper(async function(commandArgs) {
  const { username, password } = await inquirer.askLogin();
  const result = await ProtocolClient.login(username, password);
  if (result.status == CommonConstant.STATUS.SUCCESS) {
    console.log(chalk.greenBright("Login successful"));
  }
});
