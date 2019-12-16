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
    socket.write(result.getMessage());
  });

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
