import React, { useContext, useState } from "react";
import { MdHistoryToggleOff } from "react-icons/md";
import { useSelector } from "react-redux";
import { MyContext } from "../../MyContext";
import MusicCaterogy from "../MusicCategory/MusicCategory";
import { Footer } from "../Sound/Sound";
import Track from "../Track/Track";
const History = () => {
  const select = useSelector((state) => state.playlists.playlists);
  const { setSongPlay, setCurrentSongIndex, songId, songPlay } =
    useContext(MyContext);
  const [history, setHistory] = useState(select || []);

  return (
    <div>
      <div>
        {select.length ? (
          <MusicCaterogy
            title={"Hear your own playlists and the playlists you’ve liked:"}
            list={select.slice(0, 6)}
          />
        ) : (
          <div className="sound_cloud-library_likes">
            <span>
              <MdHistoryToggleOff />
            </span>
            <p>You have no listening history yet. </p>
          </div>
        )}
        {history.map((item, i, self) => (
          <div
            key={item._id}
            onClick={() => {
              setSongPlay(history);
            }}
            style={{ margin: "1rem 0" }}
          >
            <Track key={item._id} index={i} song={item} self={self} />
          </div>
        ))}
        <Footer />
      </div>
    </div>
  );
};

export default History;
