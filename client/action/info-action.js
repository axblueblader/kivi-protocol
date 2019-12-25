const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.InfoAction = class InfoAction extends BaseAction {
  constructor() {
    super(ActionConstant.TYPE.INFO);
  }

  username(username) {
    this.data.username = username;
    return this;
  }

  options(options) {
    this.data.options = options;
    return this;
  }
};

exports.CheckUserOption = class CheckUserOption {
  constructor() {
    this.exist = false;
    this.online = false;
    this.showDate = false;
    this.showName = false;
    this.showNote = false;
    this.showAll = true;
  }
};
