const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const chalk = require("chalk");
const inquirer = require("../helper/inquirer");
const exceptionWrapper = require("../helper/exception-wrapper");

const Credential = require("../credential");
module.exports = exceptionWrapper(async function(commandArgs) {
  let { username, password } = await inquirer.askLogin();
  password = Credential.encrypt(password);

  const result = await ProtocolClient.login(username, password);
  if (result.status == CommonConstant.STATUS.SUCCESS) {
    Credential.setCurrentUser(username);
    console.log(chalk.greenBright("Login successful"));
  }
});
