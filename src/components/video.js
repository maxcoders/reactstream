import React, { useEffect, useState, useRef } from "react";

export default function Video(props) {
  console.log("props", props);
  const videoRef = useRef(null);
  const [mic, setMic] = useState(true);
  const [camera, setcamera] = useState(true);
  const [videoVisible, setvideoVisible] = useState(true);

  useEffect(() => {
    if (props.videoStream) {
      videoRef.current.srcObject = props.videoStream;
    }

    if (props.videoStream && props.videoStream !== props.videoStream) {
      // if (!props.videoStream) {
      console.log("2", props.videoType, props.videoStream);
      videoRef.srcObject = props.videoStream;
    }

    // This is done only once when we receive a video track
    const videoTrack = props.videoStream && props.videoStream.getVideoTracks();
    if (props.videoType === "remoteVideo" && videoTrack && videoTrack.length) {
      videoTrack[0].onmute = () => {
        // alert('muted')
        setvideoVisible(false);
        props.videoMuted(props.videoStream);
      };

      videoTrack[0].onunmute = () => {
        setvideoVisible(true);
        props.videoMuted(props.videoStream);
      };
    }

    const audioTrack = props.videoStream && props.videoStream.getAudioTracks();
    if (props.videoType === "remoteVideo" && audioTrack && audioTrack.length) {
      audioTrack[0].onmute = () => {
        alert("muted");
        // setState({
        //   videoVisible: false,
        // })
        // props.videoMuted(props.videoStream)
      };
    }
  });

  const mutemic = (e) => {
    const stream = videoRef.current.srcObject
      .getTracks()
      .filter((track) => track.kind === "audio");

    setMic((prevState) => {
      if (stream) stream[0].enabled = !prevState;
      return { mic: !prevState };
    });
  };

  const mutecamera = (e) => {
    const stream = videoRef.current.srcObject
      .getTracks()
      .filter((track) => track.kind === "video");
    setcamera((prevState) => {
      if (stream) stream[0].enabled = !prevState;
      return { camera: !prevState };
    });
  };

  const muteControls = props.showMuteControls && (
    <div>
      <i
        onClick={mutemic}
        style={{
          cursor: "pointer",
          padding: 5,
          fontSize: 20,
          color: (mic && "white") || "red",
        }}
        className="material-icons"
      >
        {(mic && "mic") || "mic_off"}
      </i>
      <i
        onClick={mutecamera}
        style={{
          cursor: "pointer",
          padding: 5,
          fontSize: 20,
          color: (camera && "white") || "red",
        }}
        className="material-icons"
      >
        {(camera && "videocam") || "videocam_off"}
      </i>
    </div>
  );

  return (
    <div>
      {/* <audio id={props.id} muted={props.muted} ref={ (ref) => {video = ref }}></audio> */}
      <video
        width={111}
        id={props?.id}
        muted={props?.muted}
        autoPlay
        // ref={ props.videoRef }
        ref={videoRef}
      ></video>
    </div>
  );
}
