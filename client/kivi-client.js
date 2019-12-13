const net = require("net");

const { ConnectAction } = require("./action/connect-action");

const client = new net.Socket();

const encoder = require("./helper/encoder");

const Key = require("./key");

Key.gen();

client.connect(1337, "127.0.0.1", function() {
  console.log("Connected");
  const action = new ConnectAction()
    .ip("127.0.0.1")
    .port("1337")
    .pubkey(encoder.toBase64(Key.getPubKey()));

  const msg = action.getMessage();
  client.write(msg);
});

client.on("data", function(data) {
  console.log("Received: " + data);
});

client.on("close", function() {
  console.log("Connection closed");
});
