const ProtocolClient = require("../protocol-client");
const CommonConstant = require("../helper/common-constant");
const Credential = require("../credential");
const chalk = require("chalk");
const exceptionWrapper = require("../helper/exception-wrapper");
const { promises: fs } = require("fs");
module.exports = exceptionWrapper(async function(commandArgs) {
  let content = await fs.readFile(commandArgs[1]);
  let useEncrypt = false;
  const result = await ProtocolClient.upload(
    commandArgs[1],
    content,
    useEncrypt
  );
  if (result.status == CommonConstant.STATUS.SUCCESS) {
  }
});
