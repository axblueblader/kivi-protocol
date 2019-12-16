const ApiClient = require("../api-client");
const CommonConstant = require("../helper/common-constant");
const chalk = require("chalk");
const inquirer = require("../helper/inquirer");
const exceptionWrapper = require("../helper/exception-wrapper");
module.exports = exceptionWrapper(async function(commandArgs) {
  const { username, password, useEncrypt } = await inquirer.askRegister();
  const result = await ApiClient.register(username, password, useEncrypt);
  if (result.status == CommonConstant.STATUS.SUCCESS) {
    console.log(chalk.greenBright("Registration successful"));
  }
});
