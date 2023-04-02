const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, { cors: true });
const rooms = new Map();
io.on("connection", (socket) => {
  console.log("con", socket.id);
  socket.on("newroom", ({ id, ...d }) => {
    rooms.set(id, { id, ...d });
    io.emit("rooms", Array.from(rooms.values()));
    console.log(id);
    console.log(d);
  });

  socket.on("getroom", ({ id }) => {
    console.log("get room", rooms.get(id));
    //var id = Number(id);
    socket.emit("roomdetails", rooms.get(id));
  });

  socket.on("updatepeerid", ({ roomid, peerid }) => {
    updateRoom = rooms.get(roomid);
    updateRoom = { ...updateRoom, peerid };
    rooms.set(roomid, updateRoom);
    console.log(updateRoom);
  });

  socket.on("getrooms", () => {
    io.emit("rooms", Array.from(rooms.values()));
  });

  //console.log(rooms);
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
