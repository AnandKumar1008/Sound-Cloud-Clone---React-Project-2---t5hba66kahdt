import React, { useContext, useEffect, useRef, useState } from "react";

import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import "./AlbumTrack.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MyContext } from "../../MyContext";
import "../Track/TrackCard.css";
const AlbumTrack = ({ album }) => {
  const {
    played,
    setCurrentSongIndex,
    isPlaying,
    setSongPlay,
    setIsPlaying,
    currentAlbum,
    setCurrentAlbum,
  } = useContext(MyContext);

  const [albumSong, setAlbumSong] = useState([]);

  useEffect(() => {
    const getAlbumSong = async () => {
      const albumUrl = "https://academics.newtonschool.co/api/v1/music/album/";

      const headers = {
        projectId: "yji0muf36wd4",
      };

      try {
        const response = await axios.get(`${albumUrl}${album?._id}`, {
          headers,
        });
        const data = response.data;
        setAlbumSong(data.data.songs || []);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAlbumSong();
  }, []);
  return (
    <div className="sound_cloud-track">
      <div className="sound_cloud-track_image">
        <img src={album?.thumbnail || album?.image} alt="" />
      </div>
      <div className="sound_cloud-track_audio_section">
        <div className="sound_cloud-track_audio_section_play">
          {currentAlbum?._id === album?._id && isPlaying ? (
            <BsFillPauseCircleFill
              style={{
                fontSize: "3rem",
                color: "orangered",
                cursor: "pointer",
              }}
              onClick={() => setIsPlaying(false)}
            />
          ) : (
            <BsFillPlayCircleFill
              style={{
                fontSize: "3rem",
                color: "orangered",
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentAlbum(album);
                setCurrentSongIndex(0);
                setSongPlay(albumSong || []);
                setIsPlaying(true);
              }}
            />
          )}
          <span>
            <h6>{album?.title}</h6>
            <p>{album?.description}</p>
          </span>
        </div>
        {currentAlbum?._id === album?._id ? (
          <div className="sound_cloud-track_audio_section_line_space">
            <div className="sound_cloud-track_audio_section_line">
              <div
                className="sound_cloud-track_audio_section_inner"
                style={{
                  width: `${played * 100}%`,
                  backgroundColor: "orangered",
                  height: "2px",
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="sound_cloud-track_audio_section_line_space">
            <div className="sound_cloud-track_audio_section_line">
              <div
                className="sound_cloud-track_audio_section_inner"
                style={{
                  height: "2px",
                }}
              ></div>
            </div>
          </div>
        )}
        {albumSong.map((item, i) => (
          <div key={item._id} className="sound_cloud-album_track_item">
            <div className="sound_cloud-album_tarck_image">
              <img src={item.thumbnail} alt="" /> {i + 1} {item.title}
              <p></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumTrack;
