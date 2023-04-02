const express = require("express");
const PORT = 8081;
const { ExpressPeerServer } = require("peer");
const app = express();
const server = app.listen(PORT, () => {
  console.log("running on", PORT);
});
const peerServer = ExpressPeerServer(server, { debug: true });
app.use("/peerjs", peerServer);

peerServer.on("connection", (client) => {
  console.log("peer client", client.getId());
});
peerServer.on("disconnect", (client) => {
  console.log("peer client leave");
});
