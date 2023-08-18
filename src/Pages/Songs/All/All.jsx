import React, { useContext } from "react";
import Track from "../../../Components/Track/Track";
import { MyContext } from "../../../MyContext";
import "./All.css";
const url = "https://academics.newtonschool.co/api/v1/music/song";
const All = () => {
  const { allSongs, setAllSongs, setSongPlay, songPlay } =
    useContext(MyContext);

  return (
    <>
      <div className="sound_cloud-songs_all">
        <div className="sound_cloud-songs_all_list">
          {allSongs?.map((item, i, self) => (
            <div key={item?._id} className="sound_cloud-songs_all_list_item">
              <Track key={item?._id} song={item} index={i} self={self} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default All;
