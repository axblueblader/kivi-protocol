const inquirer = require("inquirer");

module.exports = {
  askAction: () => {
    const questions = [
      {
        name: "action",
        type: "input",
        message: "action: ",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Type a command";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askRegister: () => {
    const questions = [
      {
        name: "username",
        type: "input",
        message: "Username: "
      },
      {
        name: "password",
        type: "password",
        message: "Password: "
      },
      {
        name: "useEncrypt",
        type: "confirm",
        message: "Encrypt register message?"
      }
    ];
    return inquirer.prompt(questions);
  }
};
