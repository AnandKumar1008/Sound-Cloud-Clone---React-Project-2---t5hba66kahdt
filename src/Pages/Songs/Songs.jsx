import React from "react";
import { Outlet } from "react-router-dom";
import Category from "../../Components/Category/Category";
import RightSide from "../../Components/RightSide/RightSide";
import "./Songs.css";
const MusicCategory = () => {
  return (
    <div className="sound_cloud-songs">
      <Category />
      <div className="sound_cloud-songs_mid_section">
        <div className="sound_cloud-songs_left_section">
          <Outlet />
        </div>
        <div className="sound_cloud-songs_right_section">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default MusicCategory;
