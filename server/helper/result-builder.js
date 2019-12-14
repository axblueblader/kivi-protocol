const CommonConstant = require("./common-constant");
const encoder = require("./encoder");
module.exports = class Result {
  constructor() {
    this.status = CommonConstant.STATUS.SUCCESS;
    this.data = {};
    this.message = undefined;
  }

  setStatus(status) {
    this.status = status;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  getMessage() {
    if (this.message) {
      return this.message;
    } else {
      this.message = JSON.stringify(this);
      return this.message;
    }
  }
};
