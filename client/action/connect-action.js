const ActionConstant = require("./action-constant");
const MessageBuilder = require("../message/message-builder");

const BaseAction = require("./base-action");

exports.ConnectAction = class ConnectAction extends BaseAction {
  constructor() {
    super(ActionConstant.TYPE.CONNECT);
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

  pubkey(_pubkey) {
    this._pubkey = _pubkey;
    return this;
  }

  getMessage() {
    if (this._message) {
      return this._message;
    } else {
      this._message = new MessageBuilder()
        .action(this._action)
        .data([this._ip, this._port, this._uuid, this._pubkey])
        .build();
      return this._message;
    }
  }
};
