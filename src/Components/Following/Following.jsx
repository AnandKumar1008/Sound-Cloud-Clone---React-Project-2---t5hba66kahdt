import React from "react";
import { IoMdContacts } from "react-icons/io";
import MusicCaterogy from "../MusicCategory/MusicCategory";
import { Footer } from "../Sound/Sound";
const arr = [];
const Following = () => {
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
              <IoMdContacts />
            </span>
            <p>You aren’t following anyone yet </p>
            <a href="#">Browse trending playlists</a>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Following;
