module.exports = class UpdateAction {
  constructor() {
    this.info = undefined;
  }

  static fromJson(json) {
    return Object.assign(new UpdateAction(), json);
  }
};
