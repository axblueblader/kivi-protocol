const net = require("net");

const client = new net.Socket();

const Credential = require("./credential");

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

process.on("uncaughtException", function(err) {
  console.error(err);
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
        default:
          console.log(chalk.red("Invalid action"));
          break;
      }
    } catch (ex) {
      console.log(chalk.red(ex.message));
    }
  }
};

Credential.genKey();
Credential.genSocId();

main();
