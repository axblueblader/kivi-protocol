const net = require("net");

const { ConnectAction } = require("./action/connect-action");

const client = new net.Socket();

const Credential = require("./credential");

Credential.genKey();
Credential.genSocId();

client.connect(1337, "127.0.0.1", function() {
  console.log("Connected");
  const action = new ConnectAction()
    .ip("127.0.0.1")
    .port("1337")
    .pubKey(Credential.getPubKey());

  const msg = action.getMessage();
  client.write(msg);
});

client.on("data", function(data) {
  console.log("Received: " + data);
});

client.on("close", function() {
  console.log("Connection closed");
});
