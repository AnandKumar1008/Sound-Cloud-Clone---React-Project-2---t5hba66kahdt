import React from "react";
import "./RightSide.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiTwotoneCalendar } from "react-icons/ai";
const RightSide = () => {
  const recent = useSelector((state) => state.playlists.playlists);
  const navigate = useNavigate();
  return (
    <div className="sound_cloud-right_side">
      <div
        className="sound_cloud-right_side_heading"
        onClick={() => navigate("/library/history")}
        style={{ cursor: "pointer" }}
      >
        <p>
          {" "}
          <AiTwotoneCalendar /> Listening History
        </p>
        <p>View All</p>
      </div>
      {recent.map((item) => (
        <div key={item._id} className="sound_cloud-right_side_recent">
          <div className="sound_cloud-right_side_recent_image">
            <img src={item?.thumbnail} alt="" />
          </div>
          <div>
            <p>{item?.title}</p>
          </div>
        </div>
      ))}
      <div className="sound_cloud-right_side_a">
        <a href="#">Director</a> <a href="#">About Us</a>
        <a href="#">Artist</a>
        <a href="#">Resources</a>
        <a href="#">Blog</a>
        <a href="#">Jobs</a>
        <a href="#">Developers</a>
        <a href="#">Help </a>
        <a href="#">Legal</a>
        <a href="#">Privacy</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Consent Manager</a>
        <a href="#">Imprint</a>
        <a href="#">Charts</a>
      </div>
      <div>
        <p>Language:English(Us)</p>
      </div>
    </div>
  );
};

export default RightSide;
