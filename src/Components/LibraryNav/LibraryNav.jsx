import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../MyContext";
import LibMenu from "./LibMenu";
import "./LibraryNav.css";
const style = {
  color: "orangered",
  borderBottom: "2px solid orangered",
};
const LibraryNav = () => {
  const location = useLocation();
  const { hover, setHover } = useContext(MyContext);
  const handleClick = (e) => {
    setHover(e.target.name);
  };
  return (
    <div className="sound_cloud-library_nav">
      <div className="sound_cloud-library_nav_container">
        <div className="sound_cloud-library_nav_menu">
          <LibMenu />
          <p>{location.pathname.split("/")[2]?.toUpperCase() || "OVERVIEW"}</p>
        </div>
        <div className="sound_cloud-library_nav_links" onClick={handleClick}>
          <Link
            to="/library/"
            style={hover === "overview" ? style : {}}
            name="overview"
          >
            Overview
          </Link>
          <Link
            to="/library/likes"
            name="likes"
            style={hover === "likes" ? style : {}}
          >
            Likes
          </Link>
          <Link
            to="/library/playlists"
            name="playlists"
            style={hover === "playlists" ? style : {}}
          >
            PlayLists
          </Link>
          <Link
            to="/library/albums"
            name="albums"
            style={hover === "albums" ? style : {}}
          >
            Albums
          </Link>
          <Link
            to="/library/stations"
            name="stations"
            style={hover === "stations" ? style : {}}
          >
            Stations
          </Link>
          <Link
            to="/library/following"
            name="following"
            style={hover === "following" ? style : {}}
          >
            Following
          </Link>
          <Link
            to="/library/history"
            name="history"
            style={hover === "history" ? style : {}}
          >
            History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LibraryNav;
