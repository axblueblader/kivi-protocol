const Key = require("../key");

class MessageBuilder {
  constructor() {
    this._action = undefined;
    this._data = undefined;
  }

  action(action) {
    this._action = action;
    return this;
  }

  data(data) {
    this._data = data;
    return this;
  }

  build() {
    return Key.getSocketId() + " " + this._action + " " + this._data.join(" ");
  }
}
module.exports = MessageBuilder;
