import { useRef } from "react";
import { peer } from "../utils/set";
export default function T() {
  const remoteVideoRef = useRef();

  const s = peer.call("83026f6e-818a-4f02-9268-f030522ea81e", null);
  s.on("stream", (e) => {
    remoteVideoRef.current.srcObject = e;
    remoteVideoRef.current.play();
  });

  return (
    <div>
      <video width={100} ref={remoteVideoRef} />
    </div>
  );
}
