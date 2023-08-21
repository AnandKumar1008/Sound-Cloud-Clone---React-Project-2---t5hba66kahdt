import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../MyContext";
import img1 from "../Images/bg1.jpg";
import "./Category.css";
import CategoryMenu from "./CategoryMenu";
const style = {
  color: "orangered",
  borderBottom: "2px solid orangered",
};
const Category = () => {
  const location = useLocation();
  const { songPlay, currentSongIndex, active, setActive } =
    useContext(MyContext);
  const handleClick = (e) => {
    setActive(e.target.name);
  };

  return (
    <div className="sound_cloud-category">
      <div className="sound_cloud-category_top">
        <img src={img1} alt="" />
        <div className="sound_cloud-category_top_absolute">
          <p>
            {songPlay.length > currentSongIndex &&
              songPlay[currentSongIndex]?.mood.toUpperCase()}{" "}
            SONGS
          </p>
        </div>
      </div>
      <div className="sound_cloud-category_tracks">
        <span className="sound_cloud-category_menu">
          <CategoryMenu />{" "}
        </span>
        <span>{location.pathname.split("/")[2]?.toUpperCase() || "ALL"}</span>
        <div className="sound_cloud-category_tracks_left" onClick={handleClick}>
          <ul>
            <li>
              <Link to="" name="all" style={active === "all" ? style : {}}>
                All
              </Link>
            </li>
            <li>
              <Link
                to="populartracks"
                name="popular"
                style={active === "popular" ? style : {}}
              >
                Popular tracks
              </Link>
            </li>
            <li>
              <Link
                to="tracks"
                name="tracks"
                style={active === "tracks" ? style : {}}
              >
                Tracks
              </Link>
            </li>
            <li>
              <Link
                to="albums"
                name="albums"
                style={active === "albums" ? style : {}}
              >
                Albums
              </Link>
            </li>
            <li>
              <Link
                to="playlists"
                name="playlists"
                style={active === "playlists" ? style : {}}
              >
                Playlists
              </Link>
            </li>
            <li>
              <Link
                to="reposts"
                name="reposts"
                style={active === "reposts" ? style : {}}
              >
                Reposts
              </Link>
            </li>
          </ul>
        </div>

        <div className="sound_cloud-category_tracks_right">
          {/* <ul>
            <li>
              <Link>Station</Link>
            </li>
            <li>
              <Link>Follow</Link>
            </li>
            <li>
              <Link>Share</Link>
            </li>
            <li>
              <Link>Message</Link>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Category;
