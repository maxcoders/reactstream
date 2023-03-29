import React, { useEffect, useState } from "react";
import io from "socket.io-client";
export default function Home() {
  const socket = io("localhost:8080");
  const [rooms, setrooms] = useState();
  useEffect(() => {
    socket.emit("getrooms", "");
  }, []);

  socket.on("rooms", (e) => {
    setrooms(e);
  });
  const url = "/stream/";
  return (
    <div>
      {rooms &&
        rooms.map((e, i) => (
          <div key={i}>
            <p>id: {e.id}</p>
            <a href={url + e.id}>a</a>
            <p>name: {e.name}</p>
            <p>Cat: {e.cat}</p>
            <p>peerid: {e.peerid}</p>
            <img src={e.img} />
          </div>
        ))}
    </div>
  );
}
