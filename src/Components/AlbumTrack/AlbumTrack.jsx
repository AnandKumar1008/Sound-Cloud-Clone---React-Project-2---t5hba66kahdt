import React, { useContext, useEffect, useRef, useState } from "react";
// import { arr } from "../SampleAlbum";

import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import "./AlbumTrack.css";
// import "./Track.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MyContext } from "../../MyContext";
import "../Track/TrackCard.css";
const AlbumTrack = ({ album }) => {
  const {
    played,
    setPlayed,
    currentSongDetail,
    setCurrentSongDetail,
    currentSongIndex,
    setCurrentSongIndex,
    allSongs,
    isPlaying,
    setSongPlay,
    setIsPlaying,
    songId,
    setSongId,
    audioRef,
    currentAlbum,
    setCurrentAlbum,
    duration,
  } = useContext(MyContext);

  const [more, setMore] = useState(false);
  const clickRef = useRef();
  const liked = useSelector((state) => state.albums.albums);
  const repost = useSelector((state) => state.reposts.reposts);
  const dispatch = useDispatch();
  const [albumSong, setAlbumSong] = useState([]);
  const handleClick = (e) => {
    e.stopPropagation();
    setMore((p) => !p);
  };
  useEffect(() => {
    const getAlbumSong = async () => {
      const albumUrl = "https://academics.newtonschool.co/api/v1/music/album/";

      // console.log(albumUrl);
      // console.log(currentId);
      const headers = {
        projectId: "yji0muf36wd4",
      };

      try {
        const response = await axios.get(`${albumUrl}${album?._id}`, {
          headers,
        });
        const data = response.data;
        setAlbumSong(data.data.songs || []);
        //   setSongPlay(data.data.songs || []);
        //   setCurrentSongIndex(0);
        //   setIsPlaying(true);

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
                // console.log(index);
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
        {/* <div
          className="sound_cloud-track_audio_section_buttons"
          onClick={(e) => e.stopPropagation()}
        >
          {liked.some((like) => like._id === album._id) ? (
            <button
              style={{ color: "orangered" }}
              onClick={() => dispatch({ type: "REMOVE_ALBUM", payload: album })}
            >
              <AiFillHeart /> Liked
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: "ADD_ALBUM", payload: album })}
            >
              <AiFillHeart /> Like
            </button>
          )}
          {repost.some((item) => item._id === album._id) ? (
            <button
              style={{ color: "orangered" }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "REMOVE_REPOST", payload: allAlbums[0] });
              }}
            >
              <LuRepeat2 />
              Reposted
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "REPOST", payload: allAlbums[0] });
              }}
            >
              <LuRepeat2 /> Repost
            </button>
          )}
          <button>
            <FaRegShareSquare /> Share
          </button>
          <button onClick={handleClick}>
            <BsThreeDots /> More
            <div className="sound_cloud-album_track">
              {more && <More key={album?._id} item={album} setMore={setMore} />}
            </div>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AlbumTrack;
