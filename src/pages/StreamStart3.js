import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Iclose } from "../icons";
import { h } from "../lang";
import { socket } from "../utils/set";
export default function StreamStart() {
  const videoRef = useRef();
  const photoRef = useRef();
  const [userroomname, setuserroomname] = useState("");
  const [video, setvideo] = useState(true);
  const [audio, setaudio] = useState(false);
  const [localstream, setlocalstream] = useState(null);
  const [golivebtn, setgolivebtn] = useState(false);
  const [roomphoto, setroomphoto] = useState("");

  useEffect(() => {
    getlocalstream();
  }, []);

  const getlocalstream = () => {
    navigator.mediaDevices
      .getUserMedia({ video, audio })
      .then((stream) => setlocalstream(stream));
  };

  const takepicture = () => {
    const width = 80;
    const height = 55;
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    const img = photo.toDataURL("image/jpeg");
    photoRef.current.src = img;
  };

  setInterval(() => {
    takepicture();
  }, 1500);

  if (localstream) {
    videoRef.current.srcObject = localstream;
    videoRef.current.play();
  }

  if (golivebtn) {
    console.log("name ", userroomname);
    socket.emit("createroom", {
      id: userroomname,
      name: userroomname,
      img: photoRef.current.src,
      cat: "dummy desc",
    });
  }
  useEffect(() => {
    socket.on("roomcreated", (e) => {
      console.log(e);
    });
    socket.on("roomexists", (e) => {
      console.log(e);
    });
  }, [socket]);

  console.log(userroomname);
  return (
    <div className=" fwh fww">
      <video className="pa pafwh z0 bgb of" ref={videoRef} />
      <div className="pa r t cp p5 z2">
        <Link to="/">
          <Iclose fill={"#FFF"} />
        </Link>
      </div>
      <div className="fwh z3 fr p g">
        <div className="f1 fr ac g p">
          <div className="w300 bgb ra o7 p g f">
            <div>
              <canvas className="ra5" ref={photoRef}></canvas>
            </div>
            <div className="cw fr g5">
              <div className="pr">
                <input
                  type="text"
                  className="np cw bgb p5"
                  placeholder={h.h28}
                  value={userroomname}
                  onChange={(e) => {
                    setuserroomname(e.target.value);
                    localStorage.setItem("userroomname", e.target.value);
                  }}
                />
              </div>
              <div className="f jb ts">
                <select className="np cw bgb p5 cp">
                  <option value="public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="f jc g p">
          <div
            className="gb1 cw p10_ ra10 cp"
            onClick={(e) => setgolivebtn(!golivebtn)}
          >
            {h.h27}
          </div>
        </div>
      </div>
    </div>
  );
}
