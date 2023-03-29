import { useEffect, useRef, useState } from "react";
import { peer } from "../utils/set";
import Stream from "./Stream";

function App() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    peer.on("open", (id) => {
      setPeerId(id);
    });
    peer.on("call", (e) => {
      console.log("call run");
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        currentUserVideoRef.current.srcObject = stream;
        currentUserVideoRef.current.play();
        e.answer(stream);
        e.on("stream", (remote) => {
          remoteVideoRef.current.srcObject = remote;
          remoteVideoRef.current.play();
        });
      });
    });
    peerInstance.current = peer;
  }, [peer]);

  const joinpeer = (remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((rstream) => {
      currentUserVideoRef.current.srcObject = rstream;
      currentUserVideoRef.current.play();

      const rcall = peerInstance.current.call(remotePeerId, rstream);
      rcall.on("stream", (e) => {
        remoteVideoRef.current.srcObject = e;
        remoteVideoRef.current.play();
      });
    });
  };

  return (
    <div className="App">
      <p>{peerId}</p>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => joinpeer(remotePeerIdValue)}>Call</button>
      <div>
        <video width={100} ref={currentUserVideoRef} />
      </div>
      <div>
        <video width={100} ref={remoteVideoRef} />
      </div>
    </div>
  );
}
export default App;
