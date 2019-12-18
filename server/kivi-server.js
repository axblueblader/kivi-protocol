const net = require("net");
const handleAction = require("./handler/action-handler");

const Key = require("./key");

Key.gen();

const server = net.createServer(function(socket) {
  console.log(`${socket.remoteAddress}:${socket.remotePort} has connected`);

  socket.on("data", function(chunk) {
    const msgStr = chunk.toString();
    console.log(`message from ${socket.remoteAddress}:${socket.remotePort}:`);
    const result = handleAction(msgStr);
    console.log(result);
    socket.write(result.getMessage());
  });

  // TODO: FOR TEST REMOVE LATER
  setInterval(() => {
    const msg = JSON.stringify({
      type: "receive",
      status: "success",
      data: {
        sender: "abc",
        receiver: "123",
        message: "message every 2s",
        useEncrypt: false
      }
    });
    console.log(msg);
    if (socket.writable) {
      socket.write(msg);
    }
  }, 2000);

  socket.on("end", function() {
    console.log(
      `${socket.remoteAddress}:${socket.remotePort} has disconnected`
    );
    socket.end;
  });
});
const PORT = process.env.PORT || 1337;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
server.listen(PORT, HOSTNAME, function() {
  console.log("Server started listening");
});
