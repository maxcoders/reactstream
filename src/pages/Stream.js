import React, { useEffect, useState } from "react";
import { socket, peer } from "../utils/set";
import { useParams } from "react-router-dom";
export default function Stream() {
  const { id } = useParams();
  const [channal, setchannal] = useState(null);
  useEffect(() => {
    socket.emit("getroom", { id: id });
  }, []);
  socket.on("roomdetails", (e) => {
    setchannal(e);
  });

  let localStream;

  const startStream = async () => {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      //console.log("Local stream started:", localStream);
    } catch (err) {
      console.error("Error starting local stream:", err);
    }
  };
  startStream();
  if (channal?.peerid) {
    const remoteStream = peer.call(channal.peer, localStream);
    console.log("remoteStream", remoteStream);
    console.log("peerid", channal.peerid);
  }

  return <div>Stream</div>;
}
