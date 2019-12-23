module.exports = class UploadAction {
  constructor() {
    this.filePath = undefined;
    this.content = undefined;
    this.useEncrypt = undefined;
  }

  static fromJson(json) {
    return Object.assign(new UploadAction(), json);
  }
};
