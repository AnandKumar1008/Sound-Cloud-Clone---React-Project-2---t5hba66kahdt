import React from "react";
import MusicCaterogy from "../MusicCategory/MusicCategory";
import { RiBaseStationLine } from "react-icons/ri";
import { Footer } from "../Sound/Sound";
const arr = [];
const Stations = () => {
  return (
    <div>
      <div>
        {arr.length ? (
          <MusicCaterogy
            title={"Hear your own playlists and the playlists you’ve liked:"}
            list={arr.slice(0, 6)}
          />
        ) : (
          <div className="sound_cloud-library_likes">
            <span>
              <RiBaseStationLine />
            </span>
            <p>You have not liked any stations yet </p>
            <a href="#">Browse trending playlists</a>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Stations;
