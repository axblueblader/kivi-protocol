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

const inquirer = require("./helper/inquirer");
const ActionConstant = require("./action/action-constant");

const handleConnect = require("./handler/connect-handler");
const handleRegister = require("./handler/register-handler");
const ApiClient = require("./api-client");
const main = async () => {
  while (1) {
    try {
      const input = await inquirer.askAction();
      const commandArgs = input.action.split(" ");

      switch (commandArgs[0]) {
        case ActionConstant.TYPE.CONNECT:
          await handleConnect(commandArgs);
          break;
        case ActionConstant.TYPE.REGISTER:
          await handleRegister(commandArgs);
          break;
        case "exit":
        case "quit":
          console.log(chalk.yellowBright("Good bye!"));
          ApiClient.destructSocket();
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
