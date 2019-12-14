module.exports = class ActionMessage {
  constructor() {
    this.socketId = undefined;
    this.type = undefined;
    this.data = undefined;
  }
  static fromJson(json) {
    return Object.assign(new ActionMessage(), json);
  }
};
