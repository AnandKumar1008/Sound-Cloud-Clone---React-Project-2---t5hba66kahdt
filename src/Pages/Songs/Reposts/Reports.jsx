import React, { useContext, useState } from "react";
import { soundCloudData } from "../../../Components/SoundCloudSongs";
import Track from "../../../Components/Track/Track";
import { MyContext } from "../../../MyContext";
const Reports = () => {
  const [track, setTrack] = useState(soundCloudData.slice(40, 50) || []);
  const { setSongPlay } = useContext(MyContext);

  return (
    <div className="sound_cloud-songs_all">
      <div className="sound_cloud-songs_all_list">
        {track.map((item, i, self) => (
          <div key={item._id} className="sound_cloud-songs_all_list_item">
            <Track song={item} index={i} self={self} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
