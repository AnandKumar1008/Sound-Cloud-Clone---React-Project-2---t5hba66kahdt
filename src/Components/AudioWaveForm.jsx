import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import audio from "./Audio/audio.mp3";
// import Sample
const AudioWaveform = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const [progressColorWidth, setWidth] = useState("20px solid green");
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "violet",
      progressColor: "orangered",
      cursorWidth: 2,
      backend: "MediaElement",
      xhr: {
        headers: {
          projectId: "yji0muf36wd4",
        },
      },
    });

    wavesurfer.load(
      "https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf907d47ae38c3e33a189a.mp3"
    );
    const progressBar = waveformRef.current.querySelector(".progress");
    if (progressBar) {
      progressBar.style.background = progressColorWidth;
    }

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl, progressColorWidth]);

  return (
    <div>
      <div ref={waveformRef}></div>
    </div>
  );
};

export default AudioWaveform;
