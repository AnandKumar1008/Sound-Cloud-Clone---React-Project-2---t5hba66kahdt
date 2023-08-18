import React, { useContext, useEffect, useState } from "react";
import Track from "../../../Components/Track/Track";
import { audio } from "../../../Components/Audios";
import { MyContext } from "../../../MyContext";
import "./Tracks.css";
import { soundCloudData } from "../../../Components/SoundCloudSongs";
const Tracks = () => {
  const [track, setTrack] = useState(soundCloudData.slice(140, 150) || []);
  const { setSongPlay } = useContext(MyContext);

  return (
    <div className="sound_cloud-songs_all" onClick={() => setSongPlay(track)}>
      <div className="sound_cloud-songs_all_list">
        {track.map((item, i, self) => (
          <div key={item._id} className="sound_cloud-songs_all_list_item">
            <Track key={item._id} song={item} index={i} self={self} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracks;
