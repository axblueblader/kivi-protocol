module.exports = class BaseAction {
  constructor(_action) {
    this._socketId = this._action = _action;
    this._message = undefined;
  }
};
