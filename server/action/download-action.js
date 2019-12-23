module.exports = class DownloadAction {
  constructor() {
    this.filePath = undefined;
    this.content = undefined;
    this.useEncrypt = undefined;
  }

  static fromJson(json) {
    return Object.assign(new DownloadAction(), json);
  }
};
