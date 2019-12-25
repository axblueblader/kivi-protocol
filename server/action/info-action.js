module.exports = class InfoAction {
  constructor() {
    this.username = undefined;
    this.options = undefined;
  }

  static fromJson(json) {
    return Object.assign(new InfoAction(), json);
  }
};
