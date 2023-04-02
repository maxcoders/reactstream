import io from "socket.io-client";
import Peer from "peerjs";
const peer = new Peer();
// const peer = new Peer(undefined, {
//   path: "/peerjs",
//   host: "/",
//   port: 8081,
// });

const socket = io("http://localhost:8080");
export { socket, peer };
