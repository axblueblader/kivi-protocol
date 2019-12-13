const net = require("net");
const handleAction = require("./action/action-handler");

const Key = require("./key");

Key.gen();

const server = net.createServer(function(socket) {
  socket.on("data", function(chunk) {
    const msgStr = chunk.toString();
    console.log(msgStr);

    const result = handleAction(msgStr);
    socket.write(result);
  });
  socket.on("end", function(chunk) {
    console.log("Disconnected");
    socket.end;
  });
});
const PORT = process.env.PORT || 1337;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
server.listen(PORT, HOSTNAME, function() {
  console.log("Server started listening");
});
