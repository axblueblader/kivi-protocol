const net = require("net");

const { ConnectAction } = require("./action/connect-action");

const client = new net.Socket();

const Credential = require("./credential");

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

clear();

console.log(
  chalk.yellow(figlet.textSync("Kivi Client", { horizontalLayout: "full" }))
);
console.log(chalk.blueBright("Type in commands to perform actions"));
console.log(chalk.blueBright("Try 'connect 127.0.0.1 1337' to get started"));

const inquirer = require("./helper/inquirer");
const ActionConstant = require("./action/action-constant");

const handleResult = require("./handler/result-handler");

function performConnect(host, port) {
  return new Promise(function(resolve, reject) {
    client.connect(port, host, function() {
      const action = new ConnectAction()
        .ip(host)
        .port(port)
        .pubKey(Credential.getPubKey());

      const msg = action.getMessage();
      client.write(msg);
    });
    const resultHandler = function(data) {
      handleResult(data);
      client.end();
      client.removeListener("data", resultHandler);
      resolve();
    };
    client.on("data", resultHandler);
  });
}
const main = async () => {
  while (1) {
    const input = await inquirer.askAction();
    const commandArgs = input.action.split(" ");

    switch (commandArgs[0]) {
      case ActionConstant.TYPE.CONNECT:
        await performConnect(commandArgs[1], commandArgs[2]);
    }
  }
};

Credential.genKey();
Credential.genSocId();

main();
