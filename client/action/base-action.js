const Credential = require("../credential");

module.exports = class BaseAction {
  constructor(actionType) {
    this.socketId = Credential.getSocketId();
    this.type = actionType;
    this.data = {};
    this._message = undefined;
  }

  getMessage() {
    if (this._message) {
      return this._message;
    } else {
      this._message = JSON.stringify(this);
      return this._message;
    }
  }
};
