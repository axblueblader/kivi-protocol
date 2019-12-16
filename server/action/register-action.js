module.exports = class RegisterAction {
  constructor() {
    this.username = undefined;
    this.password = undefined;
    this.useEncrypt = undefined;
  }

  static fromJson(json) {
    return Object.assign(new RegisterAction(), json);
  }
};
