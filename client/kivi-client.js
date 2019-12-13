const net = require("net");

const { ConnectAction } = require("./action/connect-action");
const uuidV1 = require("uuid/v1");

const crypto = require("crypto");

const client = new net.Socket();

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem"
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem"
  }
});

const encoder = require("./helper/encoder");
client.connect(1337, "127.0.0.1", function() {
  console.log("Connected");

  const action = new ConnectAction()
    .ip("127.0.0.1")
    .port("1337")
    .uuid(uuidV1())
    .pubkey(encoder.toBase64(publicKey));

  const msg = action.getMessage();
  client.write(msg);
});

client.on("data", function(data) {
  console.log("Received: " + data);
});

client.on("close", function() {
  console.log("Connection closed");
});
