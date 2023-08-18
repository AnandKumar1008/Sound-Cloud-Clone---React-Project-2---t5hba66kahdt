import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UploadNav.css";
const style = {
  color: "orangered",
};
const UploadNav = ({ choice, setChoice }) => {
  const navigate = useNavigate();
  return (
    <div className="sound_clone-upload_nav">
      <ul className="sound_cloud-upload_header_nav">
        <li
          onClick={() => {
            setChoice("Upload");
          }}
          style={
            choice === "Upload" ? { borderBottom: "1px solid orangered" } : {}
          }
        >
          <a style={choice === "Upload" ? style : {}}>Upload</a>
        </li>
        <li onClick={() => navigate("/nextPro")}>
          <a to="">Mastering</a>
        </li>
        <li
          onClick={() => setChoice("YourTrack")}
          style={
            choice === "YourTrack"
              ? { borderBottom: "1px solid orangered" }
              : {}
          }
        >
          <a style={choice === "YourTrack" ? style : {}}>Your track</a>
        </li>
        <li onClick={() => navigate("/nextPro")}>
          <a>Artist Plans</a>
        </li>
      </ul>
    </div>
  );
};

export default UploadNav;
