const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const Credential = require("../credential");
const chalk = require("chalk");
const clear = require("clear");
const inquirer = require("../helper/inquirer");
const exceptionWrapper = require("../helper/exception-wrapper");
const ActionConstant = require("../action/action-constant");

let defaultDisplayNo = -10;

function displayMsg(messageLog, receivers) {
  clear();
  console.log(chalk.greenBright("You are chatting with: ", receivers));
  console.log(chalk.blueBright("Type '\\q' to stop chatting"));
  console.log(chalk.blueBright("Type '\\s' to refresh chat box"));
  display = messageLog.slice(defaultDisplayNo);
  display.forEach(el => {
    console.log(
      chalk.gray(el.date) +
        chalk.yellowBright(">" + el.sender + ": ") +
        chalk.whiteBright(el.message)
    );
  });
}
module.exports = exceptionWrapper(async function(commandArgs) {
  let { receivers, useEncrypt } = await inquirer.askChat();
  receivers = receivers.split(" ");
  let messageLog = [];
  ProtocolClient.event().on(ActionConstant.TYPE.RECEIVE, actionResult => {
    if (actionResult.status == CommonConstant.STATUS.SUCCESS) {
      let { sender, receiver, message, date, useEncrypt } = actionResult.data;
      if (
        // message is sent to you
        receiver == Credential.getCurrentUser() &&
        // message is from person you are chatting with
        receivers.includes(sender)
      ) {
        if (useEncrypt) {
          message = Credential.decrypt(message);
        }
        messageLog.push({
          date: new Date(date).toLocaleTimeString(),
          sender: sender,
          message: message
        });
      }
    }
  });
  while (1) {
    try {
      displayMsg(messageLog, receivers);
      const input = await inquirer.askMessage();
      if (input.message == "\\quit") {
        return;
      }

      if (input.message.trim()) {
        ProtocolClient.send(receivers, input.message, useEncrypt);
        messageLog.push({
          date: new Date().toLocaleTimeString(),
          sender: "me",
          message: input.message
        });
      }
    } catch (ex) {
      throw ex;
    }
  }
});
