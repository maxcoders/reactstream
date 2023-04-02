const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, { cors: true });
let rooms = {};
let roominfo = {};
io.on("connection", (socket) => {



/*

  socket.on("createroom", ({ id, name, img, cat }) => {
    const room = io.of("/").adapter.rooms.get(id);
    if (!room) {
      //roominfo.push([name, cat, img]);
      socket.join(id);
      rooms[id] = {
        name,
        // img,
        cat,
        // sockets: [socket.id],
        // users: [],
        // peers: [],
      };
    } else {
      socket.emit("roomexists", { message: "Room already exists" });
    }
  });
  socket.on("getroomlist", (e) => {
    socket.emit("rooms", roominfo);
  });
  socket.join("ali");
  io.sockets.adapter.rooms.delete("ali");
  console.log(io.sockets.adapter.rooms);
});


  socket.on("listrooms", () => {
    const roomList = [];

    for (const roomId in rooms) {
      const sockets = rooms[roomId].sockets;
      roomList.push({
        roomId: roomId,
        image: rooms[roomId].image,
        userCount: sockets.length,
      });
    }

    socket.emit("rooms", { rooms: roomList });
  });



  socket.on("joinroom", (data) => {
    // Odaya katılma işlemi
    const roomId = data.roomId;
    const room = rooms[roomId];

    if (room) {
      socket.join(roomId);
      room.sockets.push(socket.id);
      socket.emit("roomjoined", {
        roomId: roomId,
        image: room.image,
      });
    } else {
      socket.emit("roomnotfound", { message: "Room not found" });
    }
  });



  socket.on("chatmessage", (data) => {
    // Chat mesajı gönderme işlemi
    const roomId = data.roomId;
    const room = rooms[roomId];

    if (room) {
      io.to(roomId).emit("chatmessage", {
        username: data.username,
        message: data.message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    for (const roomId in rooms) {
      const sockets = rooms[roomId].sockets;
      const index = sockets.indexOf(socket.id);

      if (index !== -1) {
        sockets.splice(index, 1);
        io.to(roomId).emit("roomclosed");
        delete rooms[roomId];
        break;
      }
    }
  });
});

*/

server.listen(8080, () => {
  console.log("listening on *:8080");
});
