module.exports = class LoginAction {
  constructor() {
    this.username = undefined;
    this.password = undefined;
  }

  static fromJson(json) {
    return Object.assign(new LoginAction(), json);
  }
};
