const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, { cors: true });

let rooms = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("createroom", (data) => {
    // Oda oluşturma işlemi
    const roomId = data.id;
    const name = data.name;
    const cat = data.cat;
    const roomImage = data.img;
    const room = io.of("/").adapter.rooms.get(roomId); // Önceden oluşturulmuş bir oda var mı?

    if (!room) {
      socket.join(roomId);
      rooms[roomId] = {
        name: name,
        cat: cat,
        image: roomImage,
        sockets: [socket.id],
      };
      socket.emit("roomcreated", {
        name,
        cat,
        roomId: roomId,
        image: roomImage,
      });
    } else {
      socket.emit("roomexists", { message: "Room already exists" });
    }
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
    // Kullanıcının bağlantısının kesilmesi işlemi
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

server.listen(8080, () => {
  console.log("listening on *:8080");
});
