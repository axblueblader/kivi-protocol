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
console.log(chalk.blueBright("'chat' to start chatting"));
console.log(
  chalk.blueBright(
    "'upload <file_path> <file_name>' to upload a file from <file_path> and rename it to <file_name>"
  )
);
console.log(chalk.blueBright("'download <file_name>' to download a file"));
console.log(
  chalk.blueBright(
    "'check <user_name> <option_1> <option_2> <..> to check user info"
  )
);
console.log(chalk.blueBright("'update' to update your user info"));
console.log(chalk.blueBright("'exit' or 'quit' to exit program"));

const inquirer = require("./helper/inquirer");
const ActionConstant = require("./action/action-constant");

const handleConnect = require("./handler/connect-handler");
const handleRegister = require("./handler/register-handler");
const handleLogin = require("./handler/login-handler");
const handleChat = require("./handler/chat-handler");
const handleUpload = require("./handler/upload-handler");
const handleDownload = require("./handler/download-handler");
const handleCheck = require("./handler/check-handler");
const handleUpdate = require("./handler/update-handler");

const ProtocolClient = require("./protocol-client");
const main = async () => {
  let run = true;
  while (run) {
    try {
      const input = await inquirer.askCommand();
      const commandArgs = input.command.split(" ");

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
        case ActionConstant.COMMAND.UPLOAD:
          await handleUpload(commandArgs);
          break;
        case ActionConstant.COMMAND.DOWNLOAD:
          await handleDownload(commandArgs);
          break;
        case ActionConstant.COMMAND.CHECK_USER:
          await handleCheck(commandArgs);
          break;
        case ActionConstant.COMMAND.UPDATE_INFO:
          await handleUpdate(commandArgs);
          break;
        case "exit":
        case "quit":
          ProtocolClient.destructSocket();
          console.log(chalk.yellowBright("Good bye!"));

          run = false;
          return;
        default:
          console.log(chalk.red("Invalid command"));
          break;
      }

      if (!run) break;
    } catch (ex) {
      console.log(chalk.red(ex));
    }
  }
};

Credential.genKey();
Credential.genSocId();

main();
