const inquirer = require("inquirer");

module.exports = {
  Inquirer: inquirer,
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
        message: "username: "
      },
      {
        name: "password",
        type: "password",
        message: "password: "
      },
      {
        name: "useEncrypt",
        type: "confirm",
        message: "encrypt register message?"
      }
    ];
    return inquirer.prompt(questions);
  },
  askLogin: () => {
    const questions = [
      {
        name: "username",
        type: "input",
        message: "username: "
      },
      {
        name: "password",
        type: "password",
        message: "password: "
      }
    ];
    return inquirer.prompt(questions);
  },
  askChat: () => {
    const questions = [
      {
        name: "receivers",
        type: "input",
        message: "receivers: "
      },
      {
        name: "useEncrypt",
        type: "confirm",
        message: "encrypt chat messages?"
      }
    ];
    return inquirer.prompt(questions);
  },
  askMessage: () => {
    const questions = [
      {
        name: "message",
        type: "input",
        message: "message: "
      }
    ];
    return inquirer.prompt(questions);
  }
};
