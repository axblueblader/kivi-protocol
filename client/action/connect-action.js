const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.ConnectAction = class ConnectAction extends BaseAction {
  constructor() {
    super(ActionConstant.TYPE.CONNECT);
  }

  ip(_ip) {
    this.data.ip = _ip;
    return this;
  }

  port(_port) {
    this.data.port = _port;
    return this;
  }

  pubKey(_pubkey) {
    this.data.pubKey = _pubkey;
    return this;
  }
};
