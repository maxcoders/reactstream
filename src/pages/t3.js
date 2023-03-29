import { useEffect, useRef, useState } from "react";
import { socket, peer } from "../utils/set";
function App() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);

  peer.on("call", (call) => {
    call.on("stream", (remoteStream) => {
      console.log(remoteStream);
      remoteVideoRef.current.srcObject = remoteStream;

      //   remoteVideoRef.current.srcObject = remoteStream;
      //   remoteVideoRef.current.play();
    });
    call.answer(null);
  });
  return (
    <div className="App">
      <div>
        <video autoPlay width={100} ref={remoteVideoRef} />
      </div>
    </div>
  );
}

export default App;
