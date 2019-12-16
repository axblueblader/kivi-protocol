const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.RegisterAction = class RegisterAction extends BaseAction {
  constructor() {
    super(ActionConstant.TYPE.REGISTER);
  }

  username(username) {
    this.data.username = username;
    return this;
  }

  password(password) {
    this.data.password = password;
    return this;
  }

  useEncrypt(useEncrypt) {
    this.data.useEncrypt = useEncrypt;
    return this;
  }
};
