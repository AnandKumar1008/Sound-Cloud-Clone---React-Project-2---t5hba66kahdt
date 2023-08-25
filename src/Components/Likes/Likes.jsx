import React from "react";
import { BsChatSquareHeart } from "react-icons/bs";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { Footer } from "../Sound/Sound";
import "./Likes.css";
const Likes = () => {
  const liked = useSelector((state) => state.likes.likes);
  return (
    <div>
      {liked.length ? (
        <div className="sound_cloud-likes_grid">
          {liked.map((item, i, self) => (
            <Card key={item._id} item={item} self={self} />
          ))}
        </div>
      ) : (
        <div className="sound_cloud-library_likes">
          <span>
            <BsChatSquareHeart />
          </span>
          <p>You have no likes yet </p>
          <a href="#">Browse trending playlists</a>
        </div>
      )}
      {}
      <div className="sound_cloud-likes_footer">
        <Footer />
      </div>
    </div>
  );
};

export default Likes;
