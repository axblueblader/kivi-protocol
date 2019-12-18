const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const chalk = require("chalk");
const inquirer = require("../helper/inquirer");
const exceptionWrapper = require("../helper/exception-wrapper");

const Credential = require("../credential");
module.exports = exceptionWrapper(async function(commandArgs) {
  let { username, password, useEncrypt } = await inquirer.askRegister();

  if (useEncrypt) {
    password = Credential.encrypt(password);
  }

  const result = await ProtocolClient.register(username, password, useEncrypt);
  if (result.status == CommonConstant.STATUS.SUCCESS) {
    console.log(chalk.greenBright("Registration successful"));
  }
});
