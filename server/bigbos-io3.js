const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, { cors: true });
// const rooms = new Map();
const rooms = [];
io.on("connection", (socket) => {
  console.log("con", socket.id);
  socket.on("newroom", ({ id, ...d }) => {
    // rooms.set(id, { id, ...d });
    rooms;
    io.emit("rooms", Array.from(rooms.values()));
    console.log(id);
    console.log(d);
  });

  socket.on("getroom", ({ id }) => {
    var id = Number(id);
    socket.emit("roomdetails", rooms.get(id));
  });

  socket.on("updatepeerid", ({ roomid, peerid }) => {
    // console.log(roomid, peerid);

    // rooms.set(roomid, peerid);
    // rooms[roomid].set({ peerid });
    // console.log("room info", roomid, peerid);
    const updatedRooms = [...rooms].values().map((room) => {
      if (room.id === roomid) {
        return { ...room, peerid };
      } else {
        return room;
      }
    });
    console.log("peerid from room", rooms[roomid], typeof [...rooms].values());
    // update
    //    var id = Number(id);
    //  socket.emit("roomdetails", rooms.get(id));
  });

  socket.on("getrooms", () => {
    io.emit("rooms", Array.from(rooms.values()));
  });

  //console.log(rooms);
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
