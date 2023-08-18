import React from "react";
import { allAlbums } from "../../../Components/Album";
import AlbumTrack from "../../../Components/AlbumTrack/AlbumTrack";
import "./TrackAlbum.css";
const TrackAlbum = () => {
  return (
    <div className="sound_cloud-track_albums">
      {allAlbums.slice(0, 10).map((item) => (
        <div key={item._id} className="sound_cloud-track_albums_padding">
          <AlbumTrack album={item} />
        </div>
      ))}
    </div>
  );
};

export default TrackAlbum;
