const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const Credential = require("../credential");
const chalk = require("chalk");
const exceptionWrapper = require("../helper/exception-wrapper");
const { promises: fs } = require("fs");
const path = require("path");
module.exports = exceptionWrapper(async function(commandArgs) {
  let useEncrypt = false;
  let filePath = commandArgs[1];
  const result = await ProtocolClient.download(filePath, useEncrypt);
  if (result.status == CommonConstant.STATUS.SUCCESS) {
    let fileName = path.basename(filePath);
    let downloadPath = path.join(__dirname, "../downloads");

    await fs.mkdir(path.dirname(downloadPath), { recursive: true });

    let content = result.data.content;
    if (result.data.useEncrypt) {
      content = Credential.decrypt(content);
    }

    await fs.writeFile(path.join(downloadPath, fileName), Buffer.from(content));
    console.log(chalk.greenBright("Download successful"));
  }
});
