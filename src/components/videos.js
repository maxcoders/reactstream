import React, { useEffect, useState } from "react";
import Video from "./video";

export default function Videos(props) {
  console.log("working");
  const [rVideos, setrVideos] = useState([]);
  const [remoteStreams, setremoteStreams] = useState([]);
  const [selectedVideo, setselectedVideo] = useState(null);
  const [videoVisible, setvideoVisible] = useState(false);

  useEffect(() => {
    if (props.remoteStreams !== props.remoteStreams) {
      const NoOfRemoteStreams = props.remoteStreams.length;

      let selectedVideos = {};

      if (NoOfRemoteStreams === 1)
        selectedVideos = { selectedVideos: props.remoteStreams[0] };
      else {
        selectedVideos =
          (selectedVideo &&
            props.remoteStreams.filter(
              (stream) => stream.id === selectedVideo.id
            )) ||
          [];

        selectedVideos = selectedVideos.length
          ? {}
          : { selectedVideos: props.remoteStreams[NoOfRemoteStreams - 1] };
      }

      let _rVideos = props.remoteStreams.map((rVideo, index) => {
        const _videoTrack = rVideo.stream
          .getTracks()
          .filter((track) => track.kind === "video");
        // if (_videoTrack.length)
        //   _videoTrack[0].onmute = () => {
        //     alert('muted')
        //   }

        let video = (_videoTrack && (
          <Video
            videoMuted={videoMuted}
            videoType="remoteVideo"
            videoStream={rVideo.stream}
            frameStyle={{
              backgroundColor: "#ffffff12",
              maxWidth: 120,
              maxHeight: 120,
              borderRadius: 5,
              float: "left",
              margin: "0 3px",
            }}
            videoStyles={{
              objectFit: "cover",
              borderRadius: 5,
              width: 120,
              height: 120,
              maxWidth: 120,
              maxHeight: 120,
            }}
          />
        )) || <div></div>;

        return (
          <div
            id={rVideo.name}
            onClick={() => switchVideo(rVideo)}
            style={{
              cursor: "pointer",
              display: "inline-block",
            }}
            key={index}
          >
            {video}
          </div>
        );
      });
      setrVideos(_rVideos);
      setremoteStreams(props.remoteStreams);
      // setselectedVideo((prevState) => {
      //   console.log("prevState", prevState);
      //   console.log("selectedVVV", selectedVideo);
      //   return { prevState, ...selectedVideo };
      // });
      setselectedVideo(...selectedVideos);
    }
  });

  const videoMuted = (rVideo) => {
    const muteTrack = rVideo.getVideoTracks()[0];
    const isSelectedVideo = rVideo.id === selectedVideo.stream.id;
    if (isSelectedVideo) {
      setvideoVisible(!muteTrack.muted);
    }
  };

  const switchVideo = (_video) => {
    const muteTrack = _video.stream.getVideoTracks()[0];
    selectedVideo(_video);
    setvideoVisible(!muteTrack.muted);
  };

  return (
    <div>
      <Video
        videoType="previewVideo"
        frameStyle={{
          zIndex: 1,
          position: "fixed",
          bottom: 0,
          minWidth: "100%",
          minHeight: "100%",
          backgroundColor: "black",
        }}
        videoStyles={{
          minWidth: "100%",
          minHeight: "100%",
          visibility: (videoVisible && "visible") || "hidden",
        }}
        videoStream={selectedVideo && selectedVideo.stream}
      />
      <div
        style={{
          zIndex: 3,
          position: "fixed",
          padding: "6px 3px",
          backgroundColor: "rgba(0,0,0,0.3)",
          maxHeight: 120,
          top: "auto",
          right: 10,
          left: 10,
          bottom: 10,
          overflowX: "scroll",
          whiteSpace: "nowrap",
        }}
      >
        {rVideos}
      </div>
    </div>
  );
}
