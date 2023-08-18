import React, { useContext, useState } from "react";
import { soundCloudData } from "../../../Components/SoundCloudSongs";
import Track from "../../../Components/Track/Track";
import { MyContext } from "../../../MyContext";
const PopularTrack = () => {
  const [popular, setPopular] = useState(soundCloudData.slice(100, 120));
  const { setSongPlay, songPlay } = useContext(MyContext);

  return (
    <div className="sound_cloud-songs_all">
      <div className="sound_cloud-songs_all_list">
        {popular?.map((item, i, self) => (
          <div key={item._id} className="sound_cloud-songs_all_list_item">
            <Track key={item._id} song={item} index={i} self={self} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTrack;
