const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.LoginAction = class LoginAction extends BaseAction {
  constructor() {
    super(ActionConstant.TYPE.LOGIN);
  }

  username(username) {
    this.data.username = username;
    return this;
  }

  password(password) {
    this.data.password = password;
    return this;
  }
};
