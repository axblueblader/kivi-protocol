const Credential = require("../credential");

module.exports = class BaseAction {
  constructor(actionType) {
    this.socketId = Credential.getSocketId();
    this.type = actionType;
    this.data = {};
    this.message = undefined;
  }

  getMessage() {
    if (this.message) {
      return this.message;
    } else {
      this.message = JSON.stringify(this);
      return this.message;
    }
  }
};
