const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.UpdateAction = class UpdateAction extends BaseAction {
  constructor() {
    super(ActionConstant.TYPE.UPDATE);
  }

  info(info) {
    this.data.info = info;
    return this;
  }
};
