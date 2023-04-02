import React from "react";
import { useParams } from "react-router-dom";

export default function View(props) {
  const id = useParams().id;
  props.socket.emit("getroom", { id });

  props.socket.on("roomdetails", (e) => {
    console.log("view roomdetails", e);
  });

  return <div>View</div>;
}
