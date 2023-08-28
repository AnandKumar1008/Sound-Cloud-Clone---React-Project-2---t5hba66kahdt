import axios from "axios";
import React, { useContext } from "react";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { useSelector } from "react-redux";
import { MyContext } from "../../MyContext";
import Card from "../Card/Card";
import { Footer } from "../Sound/Sound";
import "./Albums.css";
import { Navigate, useNavigate } from "react-router-dom";
const Albums = () => {
  const albums = useSelector((state) => state.albums.albums);

  const {
    albumId,
    setIsPlaying,
    setAlbumId,
    setSongPlay,
    setCurrentSongIndex,
  } = useContext(MyContext);
  const apiCall = async (id) => {
    const albumUrl = "https://academics.newtonschool.co/api/v1/music/album/";

    console.log(albumUrl);
    console.log(albumId);
    const headers = {
      projectId: "yji0muf36wd4",
    };

    try {
      const response = await axios.get(`${albumUrl}${id}`, {
        headers,
      });
      const data = response.data;
      console.log(data);
      setSongPlay(data.data.songs || []);
      setCurrentSongIndex(0);
      setIsPlaying(true);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <div>
        {albums.length ? (
          <div className="sound_cloud-albums_grid">
            {albums.map((item, i, self) => (
              <div
                key={item._id}
                onClick={() => {
                  setAlbumId(item._id);
                  if (item._id != albumId) apiCall(item._id);
                }}
              >
                <Card item={item} self={self} isAlbum={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="sound_cloud-library_likes">
            <span>
              <MdOutlineFeaturedPlayList />
            </span>
            <p>You haven't liked any albums yet </p>
            <a href="#">Browse trending playlists</a>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Albums;
