const net = require("net");
const ActionResult = require("./action/action-result");
const Credential = require("./credential");
const { ConnectAction } = require("./action/connect-action");
const { RegisterAction } = require("./action/register-action");
class ApiClient {
  constructor() {
    this._isConnected = false;
    this._client = new net.Socket();
  }

  // careful with "this"
  resultPromise(resolve, reject) {
    this._client.on("data", function(data) {
      const actionResult = ActionResult.fromJson(JSON.parse(data));
      resolve(actionResult);
    });
  }
  async connect(host, port) {
    this._client.connect(port, host, () => {
      this._isConnected = true;

      const action = new ConnectAction()
        .ip(host)
        .port(port)
        .pubKey(Credential.getPubKey());

      const msg = action.getMessage();
      this._client.write(msg);
    });
    return await new Promise((resolve, reject) =>
      this.resultPromise(resolve, reject)
    );
  }

  async register(username, password, useEncrypt) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }
    const action = new RegisterAction()
      .username(username)
      .password(password)
      .useEncrypt(useEncrypt);

    const msg = action.getMessage();
    this._client.write(msg);
    return await new Promise((resolve, reject) =>
      this.resultPromise(resolve, reject)
    );
  }
}

module.exports = new ApiClient();
