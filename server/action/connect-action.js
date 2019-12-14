module.exports = class ConnectAction {
  constructor() {
    this.ip = undefined;
    this.port = undefined;
    this.pubKey = undefined;
  }

  static fromJson(json) {
    return Object.assign(new ConnectAction(), json);
  }
};
