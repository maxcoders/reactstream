import { useSelector, useDispatch } from "react-redux";
import React, { useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Iclose } from "../icons";
import { h } from "../lang";

export default function F(props) {
  const { user } = useSelector((state) => state.auth);
  const [userroomname, setuserroomname] = useState(
    localStorage.getItem("userroomname")
  );
  const [userstreamtype, setuserstreamtype] = useState(
    localStorage.getItem("userstreamtype")
  );
  const dispatch = useDispatch();
  const go = useNavigate();
  const videoRef = useRef(null);
  let photoRef = useRef(null);
  navigator.mediaDevices.getUserMedia({ video: true }).then((e) => {
    videoRef.current.srcObject = e;
    //videoRef.current.play();
  });

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

  setTimeout(() => {
    takepicture();
  }, 1500);

  const streamstartfunc = () => {
    if (!user) {
      go("/login");
    } else {
      props.socket.emit("newroom", {
        id: localStorage.getItem("auth"),
        img: photoRef.current.src,
        name: userroomname,
        cat: "",
        peerid: "",
      });

      console.log(props.peer);
      props.peer.on("open", (id) => {
        console.log(id);
        props.socket.emit("updatepeerid", {
          roomid: localStorage.getItem("auth"),
          peerid: id,
        });
      });

      //go(`/stream/${localStorage.getItem("auth")}`);
    }
  };

  const handleRoomChange = useCallback(
    (event) => {
      // setName(event.target.value);
      setuserroomname(event.target.value);
      localStorage.setItem("userroomname", event.target.value);
    },
    [userroomname]
  );
  return (
    <div className=" fwh fww">
      <video className="pa pafwh z0 bgb of" autoPlay ref={videoRef} />
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
                  onChange={handleRoomChange}
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
          {photoRef.current !== "" && (
            <div className="gb1 cw p10_ ra10 cp" onClick={streamstartfunc}>
              {h.h27}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
