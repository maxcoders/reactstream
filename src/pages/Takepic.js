import React, { useEffect, useRef } from "react";
function App() {
  let videoRef = useRef(null);
  let photoRef = useRef(null);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePicture = () => {
    const width = 100;
    const height = 100;

    let video = videoRef.current;

    let photo = photoRef.current;

    photo.width = width;

    photo.height = height;

    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, width, height);
    // img yi direkt socket e at
    const img = photo.toDataURL("image/jpeg");
    console.log(img);
    const data = {
      f: "imgupload",
      d: img,
    };
    fetch("http://localhost/h4/", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((e) => {
        console.log("host say", e);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="container">
      <video ref={videoRef} className="container"></video>

      <button onClick={takePicture} className="btn btn-danger container">
        Take Picture
      </button>

      <canvas className="container" ref={photoRef}></canvas>

      <br />
      <br />
    </div>
  );
}

export default App;
