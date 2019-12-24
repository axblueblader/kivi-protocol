const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.DownloadAction = class DownloadAction extends BaseAction {
  constructor() {
    super(ActionConstant.TYPE.DOWNLOAD);
  }

  filePath(_filePath) {
    this.data.filePath = _filePath;
    return this;
  }

  useEncrypt(_useEncrypt) {
    this.data.useEncrypt = _useEncrypt;
    return this;
  }
};
