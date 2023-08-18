import React from "react";
import { BsSliders2Vertical } from "react-icons/bs";
import "./YourTracks.css";
const YourTracks = () => {
  return (
    <div className="sound_cloud-your_tracks">
      <h1>Your Tracks</h1>
      <section className="sound_cloud-your_tracks_middle">
        <div>
          <BsSliders2Vertical />
        </div>
        <p>seems little quite over here</p>
        <a href="#">Upload a Track to share with your Follower</a>
      </section>
    </div>
  );
};

export default YourTracks;
