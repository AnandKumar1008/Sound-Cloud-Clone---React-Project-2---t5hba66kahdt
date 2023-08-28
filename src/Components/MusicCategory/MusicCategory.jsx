import React, { useState } from "react";
import "./MusicCategory.css";
import Card from "../Card/Card";
const MusicCaterogy = ({ title, description, list = [] }) => {
  const [id, setId] = useState(0);
  return (
    <div className="sound_music-music_category">
      <div className="sound_cloud-music_category">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="sound_cloud-music_category_grid">
        {list.map((item, i, self) => {
          return (
            <div key={item._id}>
              <Card item={item} self={self} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MusicCaterogy;
