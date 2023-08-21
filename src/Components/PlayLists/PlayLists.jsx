import React from "react";
import MusicCaterogy from "../MusicCategory/MusicCategory";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { Footer } from "../Sound/Sound";
const arr = [];
const PlayLists = () => {
  return (
    <div>
      {arr?.length ? (
        <MusicCaterogy
          title={"Hear your own playlists and the playlists you’ve liked:"}
          list={arr.slice(0, 6)}
        />
      ) : (
        <div className="sound_cloud-library_likes">
          <span>
            <MdOutlineFeaturedPlayList />
          </span>
          <p>You have no playlists yet</p>
          <a href="#">Browse trending playlists</a>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PlayLists;
