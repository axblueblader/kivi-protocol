module.exports = class ActionResult {
  constructor() {
    this.type = undefined;
    this.data = undefined;
    this.status = undefined;
  }
  static fromJson(json) {
    return Object.assign(new ActionResult(), json);
  }
};
