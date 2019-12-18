const Credential = require("./credential");

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

process.on("uncaughtException", function(err) {
  console.error(err);
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
  // application specific logging, throwing an error, or other logic here
});

clear();

console.log(
  chalk.yellow(figlet.textSync("Kivi Client", { horizontalLayout: "full" }))
);
console.log(chalk.blueBright("Type in commands to perform actions"));
console.log(chalk.blueBright("Try 'connect 127.0.0.1 1337' to get started"));
console.log(chalk.blueBright("'register' to create account"));
console.log(chalk.blueBright("'login' to login your account"));
console.log(chalk.blueBright("'exit' or 'quit' to exit program"));

const inquirer = require("./helper/inquirer");
const ActionConstant = require("./action/action-constant");

const handleConnect = require("./handler/connect-handler");
const handleRegister = require("./handler/register-handler");
const handleLogin = require("./handler/login-handler");
const handleChat = require("./handler/chat-handler");

const ProtocolClient = require("./protocol-client");
const main = async () => {
  while (1) {
    try {
      const input = await inquirer.askAction();
      const commandArgs = input.action.split(" ");

      switch (commandArgs[0]) {
        case ActionConstant.COMMAND.CONNECT:
          await handleConnect(commandArgs);
          break;
        case ActionConstant.COMMAND.REGISTER:
          await handleRegister(commandArgs);
          break;
        case ActionConstant.COMMAND.LOGIN:
          await handleLogin(commandArgs);
          break;
        case ActionConstant.COMMAND.CHAT:
          await handleChat(commandArgs);
          break;
        case "exit":
        case "quit":
          console.log(chalk.yellowBright("Good bye!"));
          ProtocolClient.destructSocket();
          return;
        default:
          console.log(chalk.red("Invalid action"));
          break;
      }
    } catch (ex) {
      console.log(chalk.red(ex));
    }
  }
};

Credential.genKey();
Credential.genSocId();

main();
