const MessageConstant = require("../message/message-constant");
const MessageBuilder = require("../message/message-builder");

const ActionBuilder = require("./action-builder");

exports.ConnectAction = class ConnectAction extends ActionBuilder {
  constructor() {
    super(MessageConstant.ACTION.CONNECT);
  }

  ip(_ip) {
    this._ip = _ip;
    return this;
  }

  port(_port) {
    this._port = _port;
    return this;
  }

  uuid(_uuid) {
    this._uuid = _uuid;
    return this;
  }

  build() {
    return this;
  }

  getMessage() {
    if (this._message) {
      return this._message;
    } else {
      this._message = new MessageBuilder()
        .action(this._action)
        .data([this._ip, this._port, this._uuid])
        .build();
      return this._message;
    }
  }
};
