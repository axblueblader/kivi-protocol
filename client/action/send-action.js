const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.SendAction = class SendAction extends BaseAction {
  constructor() {
    super(ActionConstant.TYPE.SEND);
  }

  recievers(_recievers) {
    this.data.recievers = _recievers;
    return this;
  }

  message(_message) {
    this.data.message = _message;
  }

  useEncrypt(_useEncrypt) {
    this.data.useEncrypt = _useEncrypt;
    return this;
  }
};
