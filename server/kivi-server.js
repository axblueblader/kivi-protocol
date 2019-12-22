const net = require("net");
const handleAction = require("./handler/action-handler");

const Key = require("./key");

const SocketKeyStore = require("./storage/socket-key-store");
const { UserDb } = require("./storage/user-database");

Key.gen();

const server = net.createServer(function(socket) {
  console.log(`${socket.remoteAddress}:${socket.remotePort} has connected`);

  socket.on("data", function(chunk) {
    const msgStr = chunk.toString();
    console.log(`message from ${socket.remoteAddress}:${socket.remotePort}:`);
    const result = handleAction(msgStr, socket);
    console.log(result);
    socket.write(result.getMessage());
  });

  socket.on("end", function() {
    console.log(
      `${socket.remoteAddress}:${socket.remotePort} has disconnected`
    );
    let socketId = SocketKeyStore.getSocketIdByHostPort(
      socket.remoteAddress,
      socket.remotePort
    );
    if (socketId) {
      let username = SocketKeyStore.getUsername(socketId);
      UserDb.update(username, { online: false });
      SocketKeyStore.delete(socketId);
      console.log(username + " has disconnected");
    }
    socket.end;
  });
});
const PORT = process.env.PORT || 1337;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
server.listen(PORT, HOSTNAME, function() {
  console.log("Server started listening");
});
