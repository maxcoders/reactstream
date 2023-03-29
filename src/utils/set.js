import io from "socket.io-client";
import Peer from "peerjs";
const peer = new Peer();
const socket = io("http://localhost:8080");
export { socket, peer };
