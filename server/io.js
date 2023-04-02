const express = require("express");
const io = require("socket.io")({
  path: "/webrtc",
  cors: true,
});
const app = express();
app.get("/", (a, b) => b.send("get lost"));
const port = 8080;
const server = app.listen(port, () => console.log("----", port));
io.listen(server);
const z = io.of("/webRTCPeers");

z.on("connection", (socket) => {
  console.log("con", socket.id);

  socket.on("sdp", (data) => {
    socket.broadcast.emit("sdp", data);
    console.log("sdp");
  });

  socket.on("candidate", (data) => {
    console.log("candi");
    socket.broadcast.emit("candidate", data);
  });

  socket.on("disconnect", () => {
    console.log("dis", socket.id);
  });
});
