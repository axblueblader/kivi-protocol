const net = require("net");

const server = net.createServer(function(socket) {
  socket.write("Echo server\r\n");
  socket.on("data", function(chunk) {
    // socket.write(chunk);
    console.log(chunk.toString());
  });
  socket.on("end", socket.end);
});

server.listen(1337, "127.0.0.1");
