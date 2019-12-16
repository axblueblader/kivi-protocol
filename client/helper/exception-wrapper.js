const chalk = require("chalk");
module.exports = function(func) {
  return async function(args) {
    try {
      return await func(args);
    } catch (ex) {
      console.log(chalk.red("An error occurred: ", ex));
    }
  };
};
