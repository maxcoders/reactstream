import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Iclose } from "../icons";
import { h } from "../lang";
export default function F(props) {
  const [mypeer, setmypeer] = useState("");
  const [remotepeer, setremotepeer] = useState("");
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const [params, setParams] = useState(useParams());
  const videoRef = useRef(null);
  const socket = props.socket;
  // console.log(params);

  useEffect(() => {
    props.peer.on("open", (id) => {
      setPeer(props.peer);
      setmypeer(props.peer.id);
      props.socket.emit("updatepeerid", { roomid: params.id, peerid: id });
    });
  }, [props.peer]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,

        width: { max: 1000 },
        height: { max: 100 },
        frameRate: { ideal: 1, max: 5 },
      })
      .then((e) => {
        setStream(e);
      });
  }, []);

  //console.log(peer);

  if (stream) {
    videoRef.current.srcObject = stream;
  }

  return (
    <div className=" fwh fww">
      <video className="pa pafwh z0 bgb of" autoPlay ref={videoRef} />
      <div className="pa r t cp p5 z2">
        <Link to="/">
          <Iclose fill={"#FFF"} />
        </Link>
      </div>
    </div>
  );
}
