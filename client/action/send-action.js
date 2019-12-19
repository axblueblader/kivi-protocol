const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.SendAction = class SendAction extends BaseAction {
  constructor() {
    super(ActionConstant.TYPE.SEND);
  }

  receivers(_receivers) {
    this.data.receivers = _receivers;
    return this;
  }

  message(_message) {
    this.data.message = _message;
    return this;
  }

  useEncrypt(_useEncrypt) {
    this.data.useEncrypt = _useEncrypt;
    return this;
  }
};
