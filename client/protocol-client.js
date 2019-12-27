const net = require("net");
const ActionResult = require("./action/action-result");
const Credential = require("./credential");

const { ConnectAction } = require("./action/connect-action");
const { RegisterAction } = require("./action/register-action");
const { LoginAction } = require("./action/login-action");
const { SendAction } = require("./action/send-action");
const { UploadAction } = require("./action/upload-action");
const { DownloadAction } = require("./action/download-action");
const { InfoAction, CheckUserOption } = require("./action/info-action");
const { UpdateAction } = require("./action/update-action");

const events = require("events");
class ProtocolClient {
  constructor() {
    this._isConnected = false;
    this._client = new net.Socket();
    this.deferedResolve = undefined;
    this.deferedReject = undefined;
    this.eventEmitter = new events.EventEmitter();
    this.initSocket();
    this.timeOut = 60000;
  }

  initSocket() {
    this._client.on("data", data => {
      const actionResult = ActionResult.fromJson(JSON.parse(data));
      this.eventEmitter.emit(actionResult.type, actionResult);
      if (this.deferedResolve) {
        this.deferedResolve(actionResult);
        this.deferedResolve = undefined;
      }
    });
    this._client.on("end", () => {
      this._isConnected = false;
      if (this.deferedReject) {
        this.deferedReject("Connection to server ended");
      }
    });
    this._client.on("error", () => {
      if (this.deferedReject) {
        this.deferedReject("Server encountered error");
      }
    });
    this._client.on("drain", () => {
      console.log("drain");
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
    setTimeout(() => {
      this.deferedReject("Action has timed out");
    }, this.timeOut);
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

  send(receivers, message, useEncrypt) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }

    if (useEncrypt) {
      message = Credential.encrypt(message);
    }

    const action = new SendAction()
      .receivers(receivers)
      .message(message)
      .useEncrypt(useEncrypt);

    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }

  event() {
    return this.eventEmitter;
  }

  upload(filePath, content, useEncrypt) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }

    if (useEncrypt) {
      content = Credential.encrypt(content);
    }

    let size = 1000;
    const numChunks = Math.ceil(content.length / size);
    const chunks = new Array(numChunks);
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      let chunk = content.substr(o, size);
      const action = new UploadAction()
        .filePath(filePath)
        .content(chunk)
        .useEncrypt(useEncrypt)
        .chunkNo(i);

      if (i == numChunks - 1) {
        action.done(true);
      }
      chunks[i] = action.getMessage();
    }

    function writeArray(arrayOfChunks, socket, callback) {
      var i = 0;
      function f() {
        if (i >= arrayOfChunks.length) {
          callback();
        } else {
          // console.log(socket.bufferSize);
          // console.log(socket.bytesWritten);
          socket.write(arrayOfChunks[i++] + "\n", f);
        }
      }
      f();
    }

    function writeArray2(arrayOfChunks, socket, callback) {
      for (let i = 0; i < arrayOfChunks.length; i++) {
        const msg = arrayOfChunks[i];
        console.log(socket.write(msg));
      }
      callback();
    }

    writeArray(chunks, this._client, () => {
      console.log("Sent files content to server");
    });
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }

  download(filePath, useEncrypt) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }

    const action = new DownloadAction()
      .filePath(filePath)
      .useEncrypt(useEncrypt);

    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }

  info(username, options) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }

    let infoOptions = new CheckUserOption();
    if (options.length > 0) {
      infoOptions.showAll = false;
      options.forEach(key => {
        infoOptions[key] = true;
      });
    }

    const action = new InfoAction().username(username).options(infoOptions);

    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }

  update(info) {
    if (!this._isConnected) {
      throw new Error("Not connected to server");
    }

    const action = new UpdateAction().info(info);

    const msg = action.getMessage();
    this._client.write(msg);
    return new Promise((resolve, reject) =>
      this.deferResultPromise(resolve, reject)
    );
  }
}

module.exports = new ProtocolClient();
