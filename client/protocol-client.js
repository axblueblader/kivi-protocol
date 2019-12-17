const net = require("net");
const ActionResult = require("./action/action-result");
const Credential = require("./credential");

const { ConnectAction } = require("./action/connect-action");
const { RegisterAction } = require("./action/register-action");
const { LoginAction } = require("./action/login-action");

class ProtocolClient {
  constructor() {
    this._isConnected = false;
    this._client = new net.Socket();
    this.deferedResolve = undefined;
    this.deferedReject = undefined;
    this.initSocket();
  }

  initSocket() {
    this._client.on("data", data => {
      if (this.deferedResolve) {
        const actionResult = ActionResult.fromJson(JSON.parse(data));
        this.deferedResolve(actionResult);
      }
    });
    this._client.on("end", () => {
      if (this.deferedReject) {
        this.deferedReject("Connection to server ended");
      }
    });
    this._client.on("error", () => {
      if (this.deferedReject) {
        this.deferedReject("Server encountered error");
      }
    });
  }

  destructSocket() {
    this._client.end();
    this._client.destroy();
  }
  disconnect() {}

  deferResultPromise(resolve, reject) {
    this.deferedResolve = resolve;
    this.deferedReject = reject;
  }

  connect(host, port) {
    this._client.connect(port, host, () => {
      this._isConnected = true;

      const action = new ConnectAction()
        .ip(host)
        .port(port)
        .pubKey(Credential.getPubKey());

      const msg = action.getMessage();
      this._client.write(msg);
    });
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }

  register(username, password, useEncrypt) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }
    const action = new RegisterAction()
      .username(username)
      .password(password)
      .useEncrypt(useEncrypt);

    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }

  login(username, password) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }
    const action = new LoginAction().username(username).password(password);

    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }
}

module.exports = new ProtocolClient();
