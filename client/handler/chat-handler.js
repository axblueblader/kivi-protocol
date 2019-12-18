const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const Credential = require("../credential");
const chalk = require("chalk");
const inquirer = require("../helper/inquirer");
const exceptionWrapper = require("../helper/exception-wrapper");
const ActionConstant = require("../action/action-constant");

module.exports = exceptionWrapper(async function(commandArgs) {
  let { receivers, useEncrypt } = await inquirer.askChat();
  let messageLog = [];
  console.log(chalk.greenBright("You are chatting with: ", receivers));
  ProtocolClient.event().on(ActionConstant.TYPE.RECEIVE, actionResult => {
    if (actionResult.status == CommonConstant.STATUS.SUCCESS) {
      let { sender, receiver, message, useEncrypt } = actionResult.data;
      if (
        // message is sent to you
        receiver == Credential.getCurrentUser() &&
        // message is from person you are chatting with
        receivers.includes(sender)
      ) {
        messageLog.push({
          sender: sender,
          message: message
        });
      }
    }
  });
  while (1) {
    try {
      const input = await inquirer.askMessage();
      if (input.message == "\\quit") {
        return;
      }
      messageLog.push({
        sender: "me",
        message: input.message
      });
      display = messageLog.slice(-6);
      display.forEach(el => {
        console.log(
          chalk.yellowBright(">>" + el.sender + ": ") + chalk.white(el.message)
        );
      });
    } catch (ex) {
      throw ex;
    }
  }
});
