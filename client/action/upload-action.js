const ActionConstant = require("./action-constant");

const BaseAction = require("./base-action");

exports.UploadAction = class UploadAction extends BaseAction {
  constructor() {
    super(ActionConstant.TYPE.UPLOAD);
  }

  filePath(_filePath) {
    this.data.filePath = _filePath;
    return this;
  }

  content(_content) {
    this.data.content = _content;
    return this;
  }

  useEncrypt(_useEncrypt) {
    this.data.useEncrypt = _useEncrypt;
    return this;
  }
};
