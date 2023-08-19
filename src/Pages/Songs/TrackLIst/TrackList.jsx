import React, { useContext, useState } from "react";
import { soundCloudData } from "../../../Components/SoundCloudSongs";
import Track from "../../../Components/Track/Track";
import { MyContext } from "../../../MyContext";
import "./TrackList.css";
const TrackList = () => {
  const [trackList, setTrackList] = useState(
    soundCloudData.slice(120, 130) || []
  );
  const { setSongPlay } = useContext(MyContext);

  return (
    <div
      className="sound_cloud-trackList"
      onClick={() => setSongPlay(trackList)}
    >
      {trackList?.map((item, i, self) => (
        <div key={item._id} className="sound_cloud-trackList_margin">
          <Track key={item._id} song={item} index={i} self={self} />
        </div>
      ))}
    </div>
  );
};

export default TrackList;
