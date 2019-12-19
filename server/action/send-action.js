module.exports = class SendAction {
  constructor() {
    this.receivers = undefined;
    this.message = undefined;
    this.useEncrypt = undefined;
  }

  static fromJson(json) {
    return Object.assign(new SendAction(), json);
  }
};
