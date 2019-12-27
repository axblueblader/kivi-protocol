const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const ActionConstant = require("../action/action-constant");
const Credential = require("../credential");
const chalk = require("chalk");
const exceptionWrapper = require("../helper/exception-wrapper");
const { promises: fs } = require("fs");
const CLI = require("clui");
const Spinner = CLI.Spinner;
const path = require("path");
module.exports = exceptionWrapper(async function(commandArgs) {
  const status = new Spinner("Uploading file, please wait...");
  status.start();
  let deferedResolve = undefined;
  ProtocolClient.event().on(ActionConstant.TYPE.UPLOAD, actionResult => {
    // console.log(actionResult);
    if (actionResult.status == CommonConstant.STATUS.SUCCESS) {
      if (actionResult.data.done) {
        console.log(chalk.greenBright("Uploading successful"));
        status.stop();
        deferedResolve();
      }
    }
  });

  let content = await fs.readFile(commandArgs[1]);
  let useEncrypt = false;
  content = content.toString();

  // setTimeout(() => {
  //   status.stop();
  //   deferedResolve();
  //   console.log(chalk.red("Uploading timed out"));
  // }, 60000);

  if (!commandArgs[2]) {
    commandArgs[2] = path.basename(commandArgs[1]);
  }
  const result = ProtocolClient.upload(commandArgs[2], content, useEncrypt);
});
