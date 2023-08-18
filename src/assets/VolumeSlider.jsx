import React, { useState } from "react";
import "./VolumeSlider.css";
const VolumeSlider = () => {
  const [volume, setVolume] = useState(100);

  return (
    <div className="volume_silder-container">
      <div className="volume_slider-cover">
        <div className="volume_slider-filled" style={{ height: "5rem" }}></div>
      </div>
    </div>
  );
};

export default VolumeSlider;
