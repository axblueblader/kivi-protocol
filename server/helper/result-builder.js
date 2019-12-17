const CommonConstant = require("./common-constant");
const encoder = require("./cryptor");
module.exports = class Result {
  constructor() {
    this.type = undefined;
    this.status = CommonConstant.STATUS.SUCCESS;
    this.data = {};
  }

  setType(type) {
    this.type = type;
    return this;
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
